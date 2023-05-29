export const sendOk = (res, data = {}, message = "OK") => {
  res.status(200).json({ message, data });
};

export const sendCreated = (res, data = {}, message = "Created") => {
  res.status(201).json({ message, data });
};

export const sendBadRequest = (res, message = "Bad Request") => {
  res.status(400).json({ error: true, message });
};

export const sendUnauthorized = (res, message = "Unauthorized") => {
  res.status(401).json({ error: true, message });
};

export const sendNotFound = (res, message = "Not Found") => {
  res.status(404).json({ error: true, message });
};

export const sendConflict = (res, message = "Conflict") => {
  res.status(409).json({ error: true, message });
};

export const sendInternalServerError = (
  res,
  message = "Internal Server Error"
) => {
  res.status(500).json({ error: true, message });
};
