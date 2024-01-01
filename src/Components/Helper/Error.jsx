const Error = ({ error }) => (
  error
    ? <p style={{ color: '#f31', margin: '1rem 0' }}>{error}</p>
    : null
)

export default Error
