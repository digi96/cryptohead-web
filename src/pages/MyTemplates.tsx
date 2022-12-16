import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useMetaMask } from "metamask-react";
import { useGetHeadTemplate } from "../hooks/HeadTemplate";
import { useNavigate } from "react-router-dom";

export default function MyTemplatesPage() {
    const {loading, success, error, retrieveData, templates} = useGetHeadTemplate();
    const { account } = useMetaMask();
    const history = useNavigate();

    useEffect(() => {
        if(account && !loading){
            retrieveData();
        }
    },[account])

    const renderTemplateList = () => {
        if(templates!.length>0){
            var renderList =  templates?.map((item, index) => {
                let tempTemplate: HeadTemplate = item;
                return <p key={index}>{tempTemplate.title} / {tempTemplate.description}</p>;
            })

            console.log(renderList);
            return renderList;
        }else{
            return (<p>No data</p>);
        }
    }


    return (
        <>
            <div className="App">
                <Container fluid="md">
                    <Button onClick={()=> history('/templates/create')}>Create</Button>
                    {success && renderTemplateList()}
                    {error}
                </Container>
            </div>
        </>
    )

}
