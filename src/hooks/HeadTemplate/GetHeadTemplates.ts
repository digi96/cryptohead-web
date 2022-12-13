import { useEffect, useState } from "react";
import { headTemplateContract } from "..";
import { useMetaMask } from "metamask-react";

export const useGetHeadTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>();
  const { account } = useMetaMask();
  const [templateQuantity, setTemplateQuantity] = useState<Number>(0);
  const [templates, setTemplates] = useState<HeadTemplate[]>();

  useEffect(() => {
    if (templateQuantity > 0) {
      //loop to get all templates
    }
  }, [templateQuantity]);

  const retrieveData = async () => {
    headTemplateContract
      .getUserTemplatesCount()
      .catch((error: any) => {
        console.log(error);
      })
      .then((result: any) => {
        if (result) {
          console.log(result[0].toNumber());
          setTemplateQuantity(result[0].toNumber());
        }
      });
  };

  return {
    loading,
    success,
    error,
    retrieveData,
  };
};
