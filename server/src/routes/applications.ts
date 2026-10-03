import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { Application } from "../models/Application.js";
import { applicationSchema } from "../schemas/application.js";
import { notifyApplication } from "../services/mailer.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { countries } from "../data/countries.js";
import { HttpError } from "../middleware/errors.js";

const router = Router();
const applicationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many application requests. Please try again later." },
});

router.post(
  "/",
  applicationLimiter,
  asyncHandler(async (request, response) => {
    const input = applicationSchema.parse(request.body);
    const country = countries.find(({ code }) => code === input.countryCode);
    if (!country) {
      throw new HttpError(400, "The selected destination is unavailable");
    }
    const canonicalInput = { ...input, countryName: country.name };
    const application = await Application.create(canonicalInput);
    response.status(201).json({
      id: application.id,
      status: application.status,
      createdAt: application.createdAt,
    });
    void notifyApplication(canonicalInput, application.id, request.log).catch(
      (error) =>
        request.log.error(
          { err: error, applicationId: application.id },
          "Unexpected notification service error",
        ),
    );
  }),
);

export default router;
