import fetch from 'node-fetch';
import GoogleReview from '../models/GoogleReview.js';

export const syncReviews = async () => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY is missing.');
  }

  if (!placeId) {
    throw new Error('GOOGLE_PLACE_ID is missing.');
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,reviews"
    }
  });

  const data = await response.json();

  console.log("Google Places API Response:");
  console.log(JSON.stringify(data, null, 2));

  if (!response.ok) {
    // Specifically handle the HTTP Referrer block for a better error message
    if (data.error && data.error.reason === 'API_KEY_HTTP_REFERRER_BLOCKED') {
      throw new Error('Google API Error: Your API key has HTTP Referrer restrictions. Backend requests do not have referrers. Please go to Google Cloud Console and change your API Key restriction to "IP addresses" or "None".');
    }
    throw new Error(data.error?.message || "Failed to fetch Google reviews.");
  }

  const reviews = data.reviews || [];

  let inserted = 0;
  let updated = 0;

  for (const review of reviews) {
    const googleReviewId =
      review.name ||
      `${review.publishTime}_${review.authorAttribution?.displayName}`;

    const existing = await GoogleReview.findOne({
      where: {
        google_review_id: googleReviewId
      }
    });

    const reviewData = {
      author_name: review.authorAttribution?.displayName || "Google User",
      profile_photo: review.authorAttribution?.photoUri || null,
      rating: review.rating || 5,
      review: review.originalText ? review.originalText.text : (review.text?.text || ""),
      review_time: review.publishTime ? new Date(review.publishTime) : new Date(),
      featured: existing ? existing.featured : true,
      average_rating: data.rating || null,
      total_reviews: data.userRatingCount || null,
      last_sync: new Date()
    };

    if (existing) {
      await existing.update(reviewData);
      updated++;
    } else {
      await GoogleReview.create({
        google_review_id: googleReviewId,
        ...reviewData
      });
      inserted++;
    }
  }

  // Optional: Update all existing rows with the new global stats so any query gets the latest.
  await GoogleReview.update(
    { 
      average_rating: data.rating || null, 
      total_reviews: data.userRatingCount || null, 
      last_sync: new Date() 
    },
    { where: {} }
  );

  return {
    success: true,
    totalGoogleReviews: data.userRatingCount || 0,
    syncedReviews: reviews.length,
    inserted,
    updated,
    businessName: data.displayName?.text,
    rating: data.rating
  };
};
