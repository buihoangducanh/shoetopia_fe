"use client";
import { useAuthContext } from "@/contexts/auth-context";
import { useCartContext } from "@/contexts/cart-context";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";

export default function CheckoutInfo() {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [clickResetForm, setClickResetForm] = useState(false);
  const { checkOutInformation, setCheckOutInformation } = useCartContext();

  const validationSchema = Yup.object().shape({
    receiverName: Yup.string().required("Vui lòng nhập tên người nhận hàng"),
    email: Yup.string().email("Email không hợp lệ"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]*$/, "Số điện thoại chỉ được chứa các chữ số")
      .min(10, "Số điện thoại phải có ít nhất 10 số"),
    shippingAddress: Yup.string().required("Vui lòng nhập địa chỉ giao hàng"),
  });

  const formik = useFormik({
    initialValues: {
      receiverName: checkOutInformation?.receiverName,
      email: user.email,
      phoneNumber: checkOutInformation?.phoneNumber,
      shippingAddress: checkOutInformation?.shippingAddress,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setCheckOutInformation({
        ...checkOutInformation,
        ...values,
      });
      setIsEditing(false);
    },
  });

  useEffect(() => {
    formik.setFieldValue("receiverName", checkOutInformation?.receiverName);
    formik.setFieldValue("email", user.email);
    formik.setFieldValue("phoneNumber", checkOutInformation?.phoneNumber);
    formik.setFieldValue(
      "shippingAddress",
      checkOutInformation?.shippingAddress
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, clickResetForm]);
  const handleCancel = () => {
    setClickResetForm(!clickResetForm);
    setIsEditing(false);
    formik.resetForm();
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-end">
          {!isEditing && (
            <button
              type="button"
              className="flex items-center gap-1 btn btn-outline-primary mr-24"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit /> Chỉnh sửa
            </button>
          )}
        </div>
        <div className="flex items-center gap-4 mt-4">
          <p className="text-base font-medium min-w-44">Tên người nhận hàng</p>
          <div className="w-[500px] flex flex-col">
            {isEditing ? (
              <Input
                name="receiverName"
                value={formik.values.receiverName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  !!formik.touched.receiverName && !!formik.errors.receiverName
                }
              />
            ) : (
              <p>{formik.values.receiverName}</p>
            )}
            {formik.touched.receiverName && formik.errors.receiverName && (
              <p className="text-red-500 mt-2 ">{formik.errors.receiverName}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <p className="text-base font-medium min-w-44">Email</p>
          <div className="w-[500px] flex flex-col">
            {isEditing ? (
              <Input
                disabled
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.touched.email && !!formik.errors.email}
              />
            ) : (
              <p>{formik.values.email}</p>
            )}
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 mt-2 ">{formik.errors.email}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <p className="text-base font-medium min-w-44">Số điện thoại</p>
          <div className="w-[500px] flex flex-col">
            {isEditing ? (
              <Input
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  !!formik.touched.phoneNumber && !!formik.errors.phoneNumber
                }
              />
            ) : (
              <p>{formik.values.phoneNumber}</p>
            )}
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-red-500 mt-2 ">{formik.errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div
          className={`flex gap-4 mt-8 ${
            !formik.errors.shippingAddress ? "items-center" : "items-start"
          }`}
        >
          <p className="text-base font-medium min-w-44">Địa chỉ giao hàng</p>
          <div className="w-[500px] flex flex-col">
            {isEditing ? (
              <Input
                name="shippingAddress"
                value={formik.values.shippingAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  !!formik.touched.shippingAddress &&
                  !!formik.errors.shippingAddress
                }
              />
            ) : (
              <p>{formik.values.shippingAddress}</p>
            )}
            {formik.touched.shippingAddress &&
              formik.errors.shippingAddress && (
                <p className="text-red-500 mt-2 ">
                  {formik.errors.shippingAddress}
                </p>
              )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          {isEditing && (
            <div className="mr-24 flex gap-6">
              <Button
                type="button"
                variant="outlined"
                onClick={handleCancel}
                className="btn btn-outline-primary"
              >
                Hủy
              </Button>
              <Button type="submit" className="btn btn-primary">
                Lưu
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
