import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { Cabin } from "../../types/Cabin";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { mapCabinFormInputToCabinDTO } from "../../utils/mappers";

import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

export interface CabinFormInput {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
}

function CreateCabinForm({ cabinToEdit }: { cabinToEdit?: Cabin }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();

  const isEditSession = Boolean(cabinToEdit?.id);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CabinFormInput>({
    defaultValues: isEditSession ? cabinToEdit : {},
  });

  const isWorking = isCreating || isUpdating;

  const onSubmit: SubmitHandler<CabinFormInput> = (data) => {
    const mappedValue = mapCabinFormInputToCabinDTO(data);

    if (isEditSession) {
      updateCabin(
        {
          cabin: mappedValue,
          id: cabinToEdit!.id,
        },
        {
          onSuccess: () => {
            reset();
          },
        },
      );
    } else {
      createCabin(mappedValue, {
        onSuccess: () => {
          reset();
        },
      });
    }
  };

  const onError: SubmitErrorHandler<CabinFormInput> = (/* errors */) => {
    // console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Regular price should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              if (Number(value) > Number(getValues().regularPrice)) {
                return "Discount should be less than regular price";
              }
            },
          })}
          defaultValue={0}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
          defaultValue=""
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
          accept="image/*"
        />
      </FormRow>

      <FormRow>
        <>
          <Button $variant="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "Edit cabin" : "Create new cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
