'use client'

import { useState } from 'react'
import { Mic, Mail, Twitter, Linkedin, Github, ArrowUp, Heart } from 'lucide-react'

// Figma: Footer Component
export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return

    // TODO: Implement actual newsletter subscription
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setIsSubscribed(true)
      setEmail('')
      console.log('Newsletter subscription:', email)
    } catch (error) {
      console.error('Subscription failed:', error)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#api' },
      { name: 'Integrations', href: '#integrations' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' }
    ],
    resources: [
      { name: 'Documentation', href: '#docs' },
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' },
      { name: 'Status', href: '#status' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  }

  return (
    <footer className="bg-secondary-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">DebatePulse</span>
            </div>
            
            <p className="text-secondary-300 mb-6 leading-relaxed">
              Transform debates into actionable insights with AI-powered analysis, 
              real-time transcription, and interactive voting systems.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#twitter"
                className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#linkedin"
                className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#github"
                className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                aria-label="View on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-secondary-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-secondary-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-secondary-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-secondary-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-secondary-300 mb-4">
              Get the latest updates on new features and insights.
            </p>

            {isSubscribed ? (
              <div className="p-4 bg-success-100 border border-success-200 rounded-lg">
                <div className="flex items-center space-x-2 text-success-700">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Thanks for subscribing!</span>
                </div>
                <p className="text-sm text-success-600 mt-1">
                  You'll receive our newsletter soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-secondary-800 border border-secondary-700 rounded-lg text-white placeholder-secondary-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    required
                    aria-label="Email address for newsletter"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}

            <div className="mt-6 p-4 bg-secondary-800 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-success-400">System Status</span>
              </div>
              <p className="text-xs text-secondary-400">
                All systems operational. 99.9% uptime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-secondary-400">
              <span>© 2024 DebatePulse. All rights reserved.</span>
              <span>Made with ❤️ for better debates</span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 px-4 py-2 text-secondary-400 hover:text-white transition-colors duration-200"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Back to top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
