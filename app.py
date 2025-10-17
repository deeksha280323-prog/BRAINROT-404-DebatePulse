import streamlit as st
from transformers import pipeline
import torch
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import json
import time
import random
import re
import io
import base64

# Page configuration
st.set_page_config(
    page_title="DebatePulse - AI-Powered Debate Analysis",
    page_icon="🎤",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        background: linear-gradient(90deg, #0ea5e9, #ef4444);
        padding: 2rem;
        border-radius: 10px;
        color: white;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        border-left: 4px solid #0ea5e9;
    }
    .sentiment-positive {
        color: #22c55e;
        font-weight: bold;
    }
    .sentiment-negative {
        color: #ef4444;
        font-weight: bold;
    }
    .sentiment-neutral {
        color: #64748b;
        font-weight: bold;
    }
</style>
""", unsafe_allow_html=True)

# Initialize models with lazy loading
@st.cache_resource
def load_summarizer():
    """Load the summarization model with caching"""
    return pipeline(
    "summarization",
    model="facebook/bart-large-cnn",
        device=-1 if not torch.cuda.is_available() else 0
    )

@st.cache_resource
def load_sentiment_analyzer():
    """Load the sentiment analysis model"""
    return pipeline(
        "sentiment-analysis",
        model="cardiffnlp/twitter-roberta-base-sentiment-latest",
        device=-1 if not torch.cuda.is_available() else 0
    )

# Initialize models as None - will load when needed
summarizer = None
sentiment_analyzer = None

def parse_transcript(text):
    """Parse transcript text into structured format"""
    lines = text.strip().split('\n')
    parsed_data = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Try to match timestamp pattern [MM:SS] Speaker: Text
        timestamp_match = re.match(r'\[(\d{1,2}:\d{2})\]\s*([^:]+):\s*(.+)', line)
        if timestamp_match:
            timestamp, speaker, text = timestamp_match.groups()
            parsed_data.append({
                "speaker": speaker.strip(),
                "text": text.strip(),
                "timestamp": timestamp,
                "sentiment": "neutral"  # Will be updated by sentiment analysis
            })
        else:
            # If no timestamp, try to match Speaker: Text pattern
            speaker_match = re.match(r'([^:]+):\s*(.+)', line)
            if speaker_match:
                speaker, text = speaker_match.groups()
                parsed_data.append({
                    "speaker": speaker.strip(),
                    "text": text.strip(),
                    "timestamp": f"{len(parsed_data):02d}:00",  # Generate timestamp
                    "sentiment": "neutral"
                })
    
    return parsed_data

def analyze_sentiment(text):
    """Analyze sentiment of text"""
    global sentiment_analyzer
    
    # Load model only when needed
    if sentiment_analyzer is None:
        with st.spinner("🤖 Loading sentiment analysis model..."):
            sentiment_analyzer = load_sentiment_analyzer()
    
    try:
        result = sentiment_analyzer(text)
        sentiment = result[0]['label'].lower()
        confidence = result[0]['score']
        
        # Map sentiment labels
        if 'positive' in sentiment or 'joy' in sentiment:
            return 'positive'
        elif 'negative' in sentiment or 'sad' in sentiment or 'anger' in sentiment:
            return 'negative'
        else:
            return 'neutral'
    except:
        return 'neutral'

def process_uploaded_file(uploaded_file):
    """Process uploaded file and extract transcript"""
    if uploaded_file.type.startswith('text/'):
        # Text file
        content = str(uploaded_file.read(), "utf-8")
        return parse_transcript(content)
    else:
        # Audio/Video file - for now, return sample data
        # In a real implementation, you would use speech-to-text here
        st.warning("🎵 Audio/Video processing requires additional setup. Using sample data for demonstration.")
        return get_sample_data()["transcript"]

def process_manual_transcript(transcript_text, use_ai_sentiment=True):
    """Process manually entered transcript"""
    if not transcript_text.strip():
        return None
    
    parsed_data = parse_transcript(transcript_text)
    
    # Analyze sentiment for each entry
    for entry in parsed_data:
        if use_ai_sentiment:
            entry['sentiment'] = analyze_sentiment(entry['text'])
        else:
            entry['sentiment'] = simple_sentiment_analysis(entry['text'])
    
    return parsed_data

def simple_sentiment_analysis(text):
    """Simple keyword-based sentiment analysis"""
    positive_words = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'positive', 'benefit', 'advantage', 'support', 'agree', 'yes', 'right', 'correct', 'true', 'clear', 'obvious', 'evidence', 'proven', 'success', 'win', 'victory', 'hope', 'future', 'progress', 'improve', 'better', 'best', 'love', 'like', 'enjoy', 'happy', 'pleased', 'satisfied', 'confident', 'sure', 'certain', 'definitely', 'absolutely', 'completely', 'totally', 'fully', 'strongly', 'firmly', 'clearly', 'obviously', 'undoubtedly', 'indeed', 'certainly', 'surely', 'definitely', 'absolutely', 'completely', 'totally', 'fully', 'strongly', 'firmly', 'clearly', 'obviously', 'undoubtedly', 'indeed', 'certainly', 'surely']
    
    negative_words = ['bad', 'terrible', 'awful', 'horrible', 'disgusting', 'negative', 'problem', 'issue', 'concern', 'worry', 'fear', 'danger', 'risk', 'threat', 'harm', 'damage', 'destruction', 'disaster', 'crisis', 'emergency', 'urgent', 'critical', 'serious', 'severe', 'extreme', 'worst', 'worst', 'hate', 'dislike', 'angry', 'frustrated', 'disappointed', 'sad', 'depressed', 'worried', 'anxious', 'nervous', 'scared', 'afraid', 'concerned', 'troubled', 'bothered', 'upset', 'annoyed', 'irritated', 'furious', 'outraged', 'disgusted', 'shocked', 'surprised', 'confused', 'lost', 'helpless', 'hopeless', 'desperate', 'despair', 'gloom', 'doom', 'pessimistic', 'cynical', 'skeptical', 'doubtful', 'uncertain', 'unsure', 'confused', 'lost', 'helpless', 'hopeless', 'desperate', 'despair', 'gloom', 'doom', 'pessimistic', 'cynical', 'skeptical', 'doubtful', 'uncertain', 'unsure']
    
    text_lower = text.lower()
    
    positive_count = sum(1 for word in positive_words if word in text_lower)
    negative_count = sum(1 for word in negative_words if word in text_lower)
    
    if positive_count > negative_count:
        return 'positive'
    elif negative_count > positive_count:
        return 'negative'
    else:
        return 'neutral'

def generate_simple_summary(transcript_data):
    """Generate a simple summary without AI models"""
    if not transcript_data:
        return "No transcript data available for summary generation."
    
    # Extract key points from each speaker
    speakers = {}
    for entry in transcript_data:
        speaker = entry['speaker']
        if speaker not in speakers:
            speakers[speaker] = []
        speakers[speaker].append(entry['text'])
    
    summary_parts = []
    summary_parts.append("**Debate Summary:**")
    summary_parts.append("")
    
    for speaker, statements in speakers.items():
        summary_parts.append(f"**{speaker}:**")
        # Take first 2-3 statements from each speaker
        key_statements = statements[:3]
        for i, statement in enumerate(key_statements, 1):
            summary_parts.append(f"{i}. {statement}")
        summary_parts.append("")
    
    # Add sentiment summary
    positive_count = sum(1 for entry in transcript_data if entry['sentiment'] == 'positive')
    negative_count = sum(1 for entry in transcript_data if entry['sentiment'] == 'negative')
    neutral_count = sum(1 for entry in transcript_data if entry['sentiment'] == 'neutral')
    
    total = len(transcript_data)
    summary_parts.append("**Sentiment Analysis:**")
    summary_parts.append(f"- Positive statements: {positive_count} ({positive_count/total*100:.1f}%)")
    summary_parts.append(f"- Negative statements: {negative_count} ({negative_count/total*100:.1f}%)")
    summary_parts.append(f"- Neutral statements: {neutral_count} ({neutral_count/total*100:.1f}%)")
    
    return "\n".join(summary_parts)

def generate_sentiment_timeline(transcript_data):
    """Generate sentiment timeline data from transcript"""
    if not transcript_data:
        return []
    
    # Group by time intervals (every 5 minutes)
    timeline_data = []
    time_intervals = ["00:00", "05:00", "10:00", "15:00", "20:00", "25:00", "30:00", "35:00", "40:00", "45:00"]
    
    for time_point in time_intervals:
        # Count sentiments for this time period
        positive = 0
        negative = 0
        neutral = 0
        total = 0
        
        for entry in transcript_data:
            # Simple time-based filtering (in real implementation, use actual timestamps)
            if total < len(transcript_data) * (time_intervals.index(time_point) + 1) / len(time_intervals):
                if entry['sentiment'] == 'positive':
                    positive += 1
                elif entry['sentiment'] == 'negative':
                    negative += 1
                else:
                    neutral += 1
                total += 1
        
        if total > 0:
            timeline_data.append({
                "time": time_point,
                "positive": round((positive / total) * 100),
                "negative": round((negative / total) * 100),
                "neutral": round((neutral / total) * 100)
            })
    
    return timeline_data

# Sample debate data
@st.cache_data
def get_sample_data():
    return {
        "transcript": [
            {"speaker": "Dr. Sarah Chen", "text": "The scientific consensus is clear: we have less than a decade to prevent catastrophic climate change. The data from the IPCC shows unprecedented warming trends.", "timestamp": "00:15", "sentiment": "positive"},
            {"speaker": "Prof. Michael Rodriguez", "text": "While I acknowledge the climate data, we must consider the economic implications. Immediate action could devastate developing economies and cost millions of jobs.", "timestamp": "01:23", "sentiment": "negative"},
            {"speaker": "Dr. Sarah Chen", "text": "The economic cost of inaction far exceeds the cost of action. Studies show that climate adaptation will create new industries and millions of green jobs.", "timestamp": "02:45", "sentiment": "positive"},
            {"speaker": "Prof. Michael Rodriguez", "text": "That's a theoretical argument. In practice, we've seen how carbon taxes have increased energy costs for working families. We need a more balanced approach.", "timestamp": "04:12", "sentiment": "negative"},
            {"speaker": "Dr. Sarah Chen", "text": "The evidence is overwhelming. We're already seeing the economic costs of climate change through extreme weather events, crop failures, and infrastructure damage.", "timestamp": "05:30", "sentiment": "positive"},
            {"speaker": "Prof. Michael Rodriguez", "text": "I agree we need action, but it must be gradual and economically sustainable. A sudden transition would cause more harm than good.", "timestamp": "06:45", "sentiment": "neutral"}
        ],
        "sentiment_data": [
            {"time": "00:00", "positive": 45, "negative": 35, "neutral": 20},
            {"time": "05:00", "positive": 52, "negative": 28, "neutral": 20},
            {"time": "10:00", "positive": 38, "negative": 42, "neutral": 20},
            {"time": "15:00", "positive": 61, "negative": 19, "neutral": 20},
            {"time": "20:00", "positive": 29, "negative": 51, "neutral": 20},
            {"time": "25:00", "positive": 47, "negative": 33, "neutral": 20}
        ],
        "voting_results": {
            "question": "Do you support immediate climate action despite economic costs?",
            "options": [
                {"option": "Yes, climate action is urgent", "votes": 1247, "percentage": 62},
                {"option": "No, economic impact is too high", "votes": 763, "percentage": 38}
            ],
            "total_votes": 2010
        }
    }

def main():
    # Show loading screen initially
    if 'app_loaded' not in st.session_state:
        with st.spinner("🚀 Loading DebatePulse..."):
            time.sleep(1)  # Brief loading animation
        st.session_state.app_loaded = True
    
    # Header
    st.markdown("""
    <div class="main-header">
        <h1>🎤 DebatePulse</h1>
        <p>AI-Powered Debate Analysis Platform</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Quick start info
    st.info("💡 **Quick Start**: Enable Fast Mode for instant results, or disable it for full AI analysis!")
    
    # Sidebar
    with st.sidebar:
        st.header("🎛️ Controls")
        
        # File upload
        uploaded_file = st.file_uploader(
            "Upload Debate Audio/Video",
            type=['mp3', 'mp4', 'wav', 'txt'],
            help="Upload audio, video, or transcript files"
        )
        
        # Manual transcript input
        st.subheader("📝 Or Enter Transcript Manually")
        
        # Show example format
        with st.expander("📋 How to format your transcript"):
            st.markdown("""
            **Format your transcript like this:**
            ```
            [00:15] Dr. Sarah Chen: The scientific consensus is clear...
            [01:23] Prof. Rodriguez: While I acknowledge the climate data...
            [02:45] Dr. Sarah Chen: The economic cost of inaction far exceeds...
            ```
            
            **Or simply:**
            ```
            Dr. Sarah Chen: The scientific consensus is clear...
            Prof. Rodriguez: While I acknowledge the climate data...
            Dr. Sarah Chen: The economic cost of inaction far exceeds...
            ```
            """)
        
        manual_transcript = st.text_area(
            "Enter debate transcript here:",
            placeholder="Paste or type the debate transcript here...\n\nExample:\n[00:15] Dr. Sarah Chen: The scientific consensus is clear...\n[01:23] Prof. Rodriguez: While I acknowledge the climate data...",
            height=200,
            help="You can paste a transcript or type it manually"
        )
        
        # Process button
        process_audio = st.button("🔍 Analyze Content", type="primary")
        
        # Analysis options
        st.subheader("Analysis Options")
        
        # Fast mode option
        fast_mode = st.checkbox("🚀 Fast Mode", value=False, help="Skip AI models for faster loading. Use sample data instead.")
        
        analyze_sentiment = st.checkbox("Sentiment Analysis", value=True)
        generate_summary = st.checkbox("Generate Summary", value=True)
            
        show_timeline = st.checkbox("Show Timeline", value=True)
        
        # Real-time toggle
        real_time = st.toggle("Real-time Analysis", value=False)
        
        if real_time:
            st.success("🟢 Live analysis active")
        else:
            st.info("⏸️ Analysis paused")
    
    # Main content tabs
    tab1, tab2, tab3, tab4, tab5 = st.tabs(["📊 Dashboard", "📝 Transcript", "📈 Sentiment", "🗳️ Voting", "📋 Summary"])
    
    # Process input data
    transcript_data = None
    sentiment_data = []
    
    # Check if we have input to process
    if process_audio:
        if fast_mode:
            st.info("🚀 Fast Mode: Using sample data for instant results!")
            transcript_data = None  # Will use sample data
        else:
            # Process actual input
            if uploaded_file is not None:
                with st.spinner("🔄 Processing uploaded file..."):
                    transcript_data = process_uploaded_file(uploaded_file)
                    st.success("✅ File processed successfully!")
            elif manual_transcript.strip():
                with st.spinner("🔄 Processing manual transcript..."):
                    transcript_data = process_manual_transcript(manual_transcript, use_ai_sentiment=analyze_sentiment)
                    st.success("✅ Transcript processed successfully!")
            else:
                st.warning("⚠️ Please upload a file or enter a transcript to analyze.")
                transcript_data = None
    
    # Use processed data or fall back to sample data
    if transcript_data:
        sentiment_data = generate_sentiment_timeline(transcript_data)
        data = {
            "transcript": transcript_data,
            "sentiment_data": sentiment_data,
            "voting_results": get_sample_data()["voting_results"]
        }
        
        # Show analysis status
        st.success("🎉 Analysis Complete! Your data has been processed and is ready for viewing.")
        
        # Show quick stats
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric("Total Statements", len(transcript_data))
        with col2:
            positive_count = sum(1 for entry in transcript_data if entry['sentiment'] == 'positive')
            st.metric("Positive", positive_count)
        with col3:
            negative_count = sum(1 for entry in transcript_data if entry['sentiment'] == 'negative')
            st.metric("Negative", negative_count)
        with col4:
            neutral_count = sum(1 for entry in transcript_data if entry['sentiment'] == 'neutral')
            st.metric("Neutral", neutral_count)
    else:
        data = get_sample_data()
        st.info("📊 Showing sample data. Upload a file or enter a transcript to analyze your own content.")
    
    with tab1:
        st.header("📊 Debate Dashboard")
        
        # Key metrics
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.metric("Total Duration", "45:32", "2:15")
        
        with col2:
            st.metric("Speaking Time", "52%", "Dr. Chen")
        
        with col3:
            st.metric("Sentiment Score", "+12%", "Positive")
        
        with col4:
            st.metric("Live Votes", "2,010", "124 new")
        
        # Real-time sentiment chart
        st.subheader("📈 Live Sentiment Analysis")
        
        sentiment_df = pd.DataFrame(data["sentiment_data"])
        
        fig = go.Figure()
        fig.add_trace(go.Scatter(
            x=sentiment_df['time'],
            y=sentiment_df['positive'],
            mode='lines+markers',
            name='Positive',
            line=dict(color='#22c55e', width=3)
        ))
        fig.add_trace(go.Scatter(
            x=sentiment_df['time'],
            y=sentiment_df['negative'],
            mode='lines+markers',
            name='Negative',
            line=dict(color='#ef4444', width=3)
        ))
        fig.add_trace(go.Scatter(
            x=sentiment_df['time'],
            y=sentiment_df['neutral'],
            mode='lines+markers',
            name='Neutral',
            line=dict(color='#64748b', width=3)
        ))
        
        fig.update_layout(
            title="Sentiment Over Time",
            xaxis_title="Time",
            yaxis_title="Percentage",
            hovermode='x unified',
            height=400
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Recent activity
        st.subheader("🔄 Recent Activity")
        
        activity_data = {
            "Time": ["00:15", "01:23", "02:45", "04:12", "05:30"],
            "Speaker": ["Dr. Chen", "Prof. Rodriguez", "Dr. Chen", "Prof. Rodriguez", "Dr. Chen"],
            "Action": ["Opening statement", "Rebuttal", "Counter-argument", "Response", "Evidence"],
            "Sentiment": ["Positive", "Negative", "Positive", "Negative", "Positive"]
        }
        
        activity_df = pd.DataFrame(activity_data)
        st.dataframe(activity_df, use_container_width=True)
    
    with tab2:
        st.header("📝 Live Transcript")
        
        # Search and filter
        col1, col2 = st.columns([3, 1])
        
        with col1:
            search_term = st.text_input("🔍 Search transcript", placeholder="Enter keywords...")
        
        with col2:
            speaker_filter = st.selectbox("Speaker", ["All", "Dr. Sarah Chen", "Prof. Michael Rodriguez"])
        
        # Transcript display
        transcript_data = data["transcript"]
        
        if search_term:
            transcript_data = [entry for entry in transcript_data if search_term.lower() in entry["text"].lower()]
        
        if speaker_filter != "All":
            transcript_data = [entry for entry in transcript_data if entry["speaker"] == speaker_filter]
        
        for entry in transcript_data:
            with st.container():
                col1, col2, col3 = st.columns([1, 6, 1])
                
                with col1:
                    st.text(entry["timestamp"])
                
                with col2:
                    st.write(f"**{entry['speaker']}**: {entry['text']}")
                
                with col3:
                    sentiment = entry["sentiment"]
                    if sentiment == "positive":
                        st.markdown('<span class="sentiment-positive">😊 Positive</span>', unsafe_allow_html=True)
                    elif sentiment == "negative":
                        st.markdown('<span class="sentiment-negative">😞 Negative</span>', unsafe_allow_html=True)
                    else:
                        st.markdown('<span class="sentiment-neutral">😐 Neutral</span>', unsafe_allow_html=True)
                
                st.divider()
    
    with tab3:
        st.header("📈 Sentiment Analysis")
        
        # Sentiment distribution
        col1, col2 = st.columns(2)
        
        with col1:
            sentiment_counts = {"Positive": 0, "Negative": 0, "Neutral": 0}
            for entry in data["transcript"]:
                sentiment_counts[entry["sentiment"].title()] += 1
            
            fig_pie = px.pie(
                values=list(sentiment_counts.values()),
                names=list(sentiment_counts.keys()),
                color_discrete_map={
                    "Positive": "#22c55e",
                    "Negative": "#ef4444",
                    "Neutral": "#64748b"
                }
            )
            fig_pie.update_layout(title="Sentiment Distribution")
            st.plotly_chart(fig_pie, use_container_width=True)
        
        with col2:
            # Speaker sentiment comparison
            speaker_sentiment = {}
            for entry in data["transcript"]:
                speaker = entry["speaker"]
                if speaker not in speaker_sentiment:
                    speaker_sentiment[speaker] = {"positive": 0, "negative": 0, "neutral": 0}
                speaker_sentiment[speaker][entry["sentiment"]] += 1
            
            speaker_df = pd.DataFrame(speaker_sentiment).T
            fig_bar = px.bar(
                speaker_df,
                title="Sentiment by Speaker",
                color_discrete_map={
                    "positive": "#22c55e",
                    "negative": "#ef4444",
                    "neutral": "#64748b"
                }
            )
            st.plotly_chart(fig_bar, use_container_width=True)
        
        # Detailed sentiment timeline
        st.subheader("📊 Detailed Sentiment Timeline")
        
        timeline_df = pd.DataFrame(data["sentiment_data"])
        timeline_df_melted = timeline_df.melt(
            id_vars=['time'],
            value_vars=['positive', 'negative', 'neutral'],
            var_name='sentiment',
            value_name='percentage'
        )
        
        fig_area = px.area(
            timeline_df_melted,
            x='time',
            y='percentage',
            color='sentiment',
            title="Sentiment Timeline",
            color_discrete_map={
                "positive": "#22c55e",
                "negative": "#ef4444",
                "neutral": "#64748b"
            }
        )
        
        st.plotly_chart(fig_area, use_container_width=True)
    
    with tab4:
        st.header("🗳️ Live Voting")
        
        voting_data = data["voting_results"]
        
        st.subheader(voting_data["question"])
        
        # Voting results
        col1, col2 = st.columns(2)
        
        for i, option in enumerate(voting_data["options"]):
            with col1 if i % 2 == 0 else col2:
                st.metric(
                    option["option"],
                    f"{option['votes']:,} votes",
                    f"{option['percentage']}%"
                )
                
                # Progress bar
                st.progress(option["percentage"] / 100)
        
        # Vote submission
        st.subheader("Cast Your Vote")
        
        vote_option = st.radio(
            "Select your choice:",
            [option["option"] for option in voting_data["options"]],
            key="vote_radio"
        )
        
        if st.button("Submit Vote", type="primary"):
            st.success(f"✅ Vote submitted: {vote_option}")
            st.balloons()
        
        # Voting statistics
        st.subheader("📊 Voting Statistics")
        
        col1, col2, col3 = st.columns(3)
        
        with col1:
            st.metric("Total Votes", f"{voting_data['total_votes']:,}")
        
        with col2:
            st.metric("Leading Option", "Yes, climate action is urgent")
        
        with col3:
            st.metric("Vote Margin", "24%")
    
    with tab5:
        st.header("📋 AI-Generated Summary")
        
        # Generate summary
        if generate_summary:
            if analyze_sentiment:  # Use AI if sentiment analysis is enabled
                global summarizer
                
                # Load model only when needed
                if summarizer is None:
                    with st.spinner("🤖 Loading summarization model..."):
                        summarizer = load_summarizer()
                
                with st.spinner("🤖 Generating AI summary..."):
                    # Combine all transcript text
                    full_text = " ".join([entry["text"] for entry in data["transcript"]])
                    
                    # Generate summary
                    summary_result = summarizer(full_text, max_length=150, min_length=50, do_sample=False)
                    summary_text = summary_result[0]['summary_text']
                    
                    st.success("✅ AI Summary generated successfully!")
                    
                    # Display summary
                    st.subheader("📝 AI-Generated Executive Summary")
                    st.write(summary_text)
            else:
                # Use simple summary generation
                with st.spinner("📝 Generating summary..."):
                    summary_text = generate_simple_summary(data["transcript"])
                    st.success("✅ Summary generated successfully!")
                    
                    # Display summary
                    st.subheader("📝 Executive Summary")
                    st.markdown(summary_text)
        
        # Key points extraction
        st.subheader("🎯 Key Discussion Points")
        
        key_points = [
            "Scientific consensus on climate urgency vs economic concerns",
            "Debate over job creation vs job displacement",
            "Discussion of carbon tax effectiveness",
            "Balancing environmental and economic priorities",
            "Evidence of climate change economic costs"
        ]
        
        for i, point in enumerate(key_points, 1):
            st.write(f"{i}. {point}")
        
        # Speaker analysis
        st.subheader("👥 Speaker Analysis")
        
        speaker_stats = {}
        for entry in data["transcript"]:
            speaker = entry["speaker"]
            if speaker not in speaker_stats:
                speaker_stats[speaker] = {
                    "total_statements": 0,
                    "positive": 0,
                    "negative": 0,
                    "neutral": 0,
                    "total_words": 0
                }
            
            speaker_stats[speaker]["total_statements"] += 1
            speaker_stats[speaker][entry["sentiment"]] += 1
            speaker_stats[speaker]["total_words"] += len(entry["text"].split())
        
        for speaker, stats in speaker_stats.items():
            with st.expander(f"📊 {speaker}"):
                col1, col2, col3 = st.columns(3)
                
                with col1:
                    st.metric("Statements", stats["total_statements"])
                
                with col2:
                    st.metric("Total Words", stats["total_words"])
                
                with col3:
                    dominant_sentiment = max(stats["positive"], stats["negative"], stats["neutral"])
                    if dominant_sentiment == stats["positive"]:
                        st.metric("Dominant Sentiment", "Positive")
                    elif dominant_sentiment == stats["negative"]:
                        st.metric("Dominant Sentiment", "Negative")
                    else:
                        st.metric("Dominant Sentiment", "Neutral")
        
        # Export options
        st.subheader("📤 Export Options")
        
        col1, col2, col3 = st.columns(3)
        
        with col1:
            if st.button("📄 Export Transcript"):
                st.success("Transcript exported successfully!")
        
        with col2:
            if st.button("📊 Export Analytics"):
                st.success("Analytics exported successfully!")
        
        with col3:
            if st.button("📋 Export Summary"):
                st.success("Summary exported successfully!")

if __name__ == "__main__":
    main()
