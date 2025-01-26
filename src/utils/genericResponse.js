export function genericResponse(res, data) {
  res.status(200).json({
    success: true,
    data: data || {},
    message: null,
  });
}
