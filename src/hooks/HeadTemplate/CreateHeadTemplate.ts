import { useState } from "react";
import { headTemplateContract } from "..";

export const useCreateHeadTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>();

  const send = async (template: HeadTemplate) => {
    console.log("sending create template......");
    try {
      setLoading(true);
      const tx = await headTemplateContract.createTemplate(template);
      tx.wait().then(function (receipt: any) {
        console.log(receipt);
        setLoading(false);
        setSuccess(true);
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err);
    }
  };

  return {
    loading,
    success,
    error,
    send,
  };
};
