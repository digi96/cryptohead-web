import { useEffect, useState } from "react";
import { headTemplateContract } from "..";
import { useMetaMask } from "metamask-react";

export const useGetHeadTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>();
  const { account } = useMetaMask();
  const [templateQuantity, setTemplateQuantity] = useState<number>(0);
  const [templates, setTemplates] = useState<HeadTemplate[]>();

  useEffect(() => {
    const getAllTemplates = async () => {
      let tempTemplates: HeadTemplate[] = [];
      for (let i = 0; i <= templateQuantity - 1; i++) {
        await headTemplateContract
          .userTemplates(account, i)
          .then((result: any) => {
            let newTemplate: HeadTemplate = {
              templateId: result[0].toNumber(),
              title: result[1],
              description: result[2],
              quantity: result[3].toNumber(),
              issued: result[4].toNumber(),
              owner: result[5],
            };
            tempTemplates.push(newTemplate);
          });
      }
      setTemplates(tempTemplates);
      setLoading(false);
      setSuccess(true);
    };

    if (account && templateQuantity > 0) {
      setLoading(true);
      getAllTemplates().catch((error: any) => {
        console.log(error);
        setError(error);
        setLoading(false);
        setSuccess(false);
      });
    }
  }, [templateQuantity]);

  const retrieveData = async () => {
    if (!account) {
      console.log("no account...");
      return;
    }
    setLoading(true);
    console.log(account);
    headTemplateContract
      .getUserTemplatesCount(account)
      .catch((error: any) => {
        console.log(error);
        setError(error);
        setLoading(false);
      })
      .then((result: any) => {
        if (result) {
          console.log(result);
          console.log(result.toNumber());
          setTemplateQuantity(result.toNumber());
          setLoading(false);
        }
      });
  };

  return {
    loading,
    success,
    error,
    retrieveData,
    templates,
  };
};
