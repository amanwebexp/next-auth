"use client";

import userDetail from "@/services/UserDetail";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const ProductDetail = ({ params }) => {
  const { id } = params; // ✅ Extract product ID from route params
  const { data: session } = useSession(); // ✅ Access logged-in user session

  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state for API call
  // ✅ Fetch product details from API using product ID
  const fetchSingleProduct = async () => {
    if (!session) return;

    try {
      setLoading(true);
      const response = await userDetail.getSingleProduct(id);
      setSingleProduct(response);
    } catch (err) {
      console.error("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  };
  // ✅ Fetch product data whenever session changes (user logs in/out)
  useEffect(() => {
    fetchSingleProduct();
  }, [session]);
  // ✅ Handle loading and empty product states

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!singleProduct)
    return <div className="p-8 text-center">Product not found.</div>;
  // ✅ Destructure product fields for easier access
  const {
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    meta,
    images,
    thumbnail,
  } = singleProduct;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Product Header */}
      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-md rounded-lg p-6">
        {/* Image */}
        <div className="flex-1">
          <img
            src={images?.[0] || thumbnail}
            alt={title}
            width={500}
            height={500}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-gray-600">{description}</p>

          <div className="mt-2 text-sm text-gray-500">
            <p>
              Category:{" "}
              <span className="font-medium text-gray-800">{category}</span>
            </p>
            <p>
              Brand: <span className="font-medium text-gray-800">{brand}</span>
            </p>
            <p>
              SKU: <span className="font-medium text-gray-800">{sku}</span>
            </p>
          </div>

          {/* Price & Discount */}
          <div className="mt-3">
            <p className="text-3xl font-bold text-pink-600">${price}</p>
            <p className="text-sm text-gray-500">
              Discount: {discountPercentage}% off
            </p>
          </div>

          {/* Rating & Stock */}
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span>⭐ {rating.toFixed(1)}</span>
            <span>| Stock: {stock} units</span>
            <span
              className={`${
                availabilityStatus === "In Stock"
                  ? "text-green-600"
                  : "text-red-600"
              } font-semibold`}
            >
              {availabilityStatus}
            </span>
          </div>

          {/* Additional Info */}
          <div className="mt-4 text-sm text-gray-600">
            <p>Warranty: {warrantyInformation}</p>
            <p>Shipping: {shippingInformation}</p>
            <p>Return Policy: {returnPolicy}</p>
            <p>Min Order Qty: {minimumOrderQuantity}</p>
            <p>Weight: {weight}g</p>
            <p>
              Dimensions: {dimensions.width}×{dimensions.height}×
              {dimensions.depth} cm
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Buy Button */}
          <button className="mt-6 bg-pink-600 text-white py-2 px-6 rounded hover:bg-pink-700 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border rounded-md p-4 bg-gray-50">
                <p className="font-semibold">
                  {review.reviewerName} - ⭐ {review.rating}
                </p>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-xs text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Meta Info */}
      <div className="mt-10 text-xs text-gray-500">
        <p>Barcode: {meta?.barcode}</p>
        {meta?.qrCode && (
          <div className="mt-2">
            <img
              src={meta.qrCode}
              alt="QR Code"
              width={100}
              height={100}
              className="rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
