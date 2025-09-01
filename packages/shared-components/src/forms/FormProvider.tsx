import React from "react";
import {
  FormProvider as ReactHookFormProvider,
  UseFormReturn,
} from "react-hook-form";

interface FormProviderProps {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  className?: string;
}

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  methods,
  onSubmit,
  className = "space-y-4",
}) => {
  const { handleSubmit } = methods;

  return (
    <ReactHookFormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </ReactHookFormProvider>
  );
};
