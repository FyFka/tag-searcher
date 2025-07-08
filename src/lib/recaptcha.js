import { validateTurnstileToken } from "next-turnstile";

export const validateRecaptchaToken = async (token) => {
  try {
    if (process.env.NODE_ENV === "development") return true;
    const validationResponse = await validateTurnstileToken({
      token,
      secretKey: process.env.TURNSTILE_SECRET_KEY,
    });

    if (!validationResponse.success) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
