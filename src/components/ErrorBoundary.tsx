import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError (error: string | null) {
    return { error };
  }

  componentDidCatch (error, info) {
    // put error handling here
    console.error(error, info.componentStack);
  }

  render () {
    if (this.state.error) {
      // You can render any custom fallback UI
      return this.props.fallback ?? this.state.error;
    }

    return this.props.children;
  }
}
