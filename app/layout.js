export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Recensor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
