import streamlit as st

st.set_page_config(
    page_title="DebatePulse Test",
    page_icon="🎤",
    layout="wide"
)

st.title("🎤 DebatePulse Test")
st.write("If you can see this, Streamlit is working!")

st.header("Test Input")
user_input = st.text_input("Enter some text:")
if user_input:
    st.write(f"You entered: {user_input}")

st.header("Test Button")
if st.button("Click me!"):
    st.success("Button works!")

st.header("Test Chart")
import pandas as pd
import plotly.express as px

df = pd.DataFrame({
    'x': [1, 2, 3, 4, 5],
    'y': [2, 4, 6, 8, 10]
})

fig = px.line(df, x='x', y='y', title='Test Chart')
st.plotly_chart(fig)

st.success("✅ All components working!")
