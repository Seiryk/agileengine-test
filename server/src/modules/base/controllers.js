export const defaultRouter = (req, res) => {
  res.status(404).json({ error: 'Not Found' })
};

export const syncErrorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message })
};