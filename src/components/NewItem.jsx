import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { ContextDetails } from "../App";
import FormSelect from "./FormSelect";
import { Button, message, Upload } from "antd";

export const NewItem = ({ handleCancel }) => {
  const [imageFile, setImageFile] = useState(null);
  const { products, setProducts } = useContext(ContextDetails);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      itemCount: "",
      category: "",
      image: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const newData1 = { id: products?.length + 1, ...data, image: imageFile };
    const newdata = [newData1, ...products];
    setProducts(newdata);
    reset();
    handleCancel();
  };

  const props = {
    name: "image",
    onchange,
  };

  const categoryOptions = [
    { value: "jewelery", label: "Jewelery" },
    { value: "men's clothing", label: "Clothing" },
    { value: "electronics", label: "Electronics" },
    { value: "women's clothing", label: "Womens Clothing" },
  ];

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImageFile(info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  console.log(imageFile);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="title"
        label="Title"
        control={control}
        errors={errors}
        rules={{
          required: { value: true, message: "Title is required" },
        }}
      />
      <FormInput
        name="description"
        label="Description"
        control={control}
        errors={errors}
        rules={{
          required: { value: true, message: "description is required" },
        }}
      />
      <FormInput
        name="price"
        label="Price"
        control={control}
        errors={errors}
        type={"Number"}
        rules={{
          required: { value: true, message: "Price is required" },
        }}
      />
      <FormInput
        name="itemCount"
        label="Quantity"
        control={control}
        errors={errors}
        type={"Number"}
        rules={{
          required: { value: true, message: "Price is required" },
        }}
      />
      <FormSelect
        name="category"
        label="Category"
        control={control}
        errors={errors}
        options={categoryOptions}
        rules={{
          required: { value: true, message: "Category is required" },
        }}
        placeholder="Select"
      />
      <div>
        <div>
          <label>Image</label>
        </div>
        <Upload
          name="image"
          onChange={handleFileChange}
          beforeUpload={() => false}
        >
          <Button>Click to Upload</Button>
        </Upload>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
