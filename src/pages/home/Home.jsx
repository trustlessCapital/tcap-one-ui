import LgWidgets from '../../components/lgwidgets/LgWidgets'
import SmWidgets from '../../components/smwidgets/SmWidgets'
import { Link } from 'react-router-dom';
import './home.css'
import { React, useEffect, useState } from 'react';
import { companyApiProvider } from 'services/api/company/companyService';

export default function Home(props) {
const [relationships,setRelationships] = useState([]);
const [userDataDetails,setUserDetails] = useState([]);
  useEffect(async()=>{
    let relationshipsData=[];
    const userDataDetails= await companyApiProvider.verifyEmail(props?.userData?.user);
    await setUserDetails(userDataDetails);
    if(userDataDetails.tcapRelation == 'vendor')
     relationshipsData = await companyApiProvider.getVendorRelationships(props?.userData?.user);
    else if (userDataDetails.tcapRelation == 'anchor')
     relationshipsData = await companyApiProvider.getAnchorRelationships(props?.userData?.user);
    await setRelationships(relationshipsData);
    
  },[])
    return (
      <div className="home">
        <div className="homeWidgets">
        <div style={{flexGrow:'1'}}><h1>Welcome to TCAP</h1></div>
          {/* <SmWidgets/>
                <LgWidgets/> */}

{!props.verified?.companyId && !(props.userData?.user=='lingraj@trustless.capital' || props.userData?.user=='kapil@trustless.capital' || props.userData?.user=='nagarjun@trustless.capital' || props.userData?.user=='hello@trustless.capital') &&
              <>
           <br></br>   
          <div>
            Please verify you KYC &nbsp;
            <Link to="/onboardentity">Verify</Link>
          </div>
          <div>
          
            </div>
          </>}
          {props?.userData?.type=='company' && userDataDetails.tcapRelation=='vendor' && <div>
            <h1>{userDataDetails.tcapRelation} Relationships</h1>
            <div>
               {relationships.map((relationship)=>{
                return(<div style={{border:'1px grey solid',padding:'10px'}} key={relationship.id}> 
                <h5>
                   anchorApproverEmail: {relationship.anchorApproverEmail}<br></br>
Anchor Contact: {relationship.anchorContact}<br></br>
Anchor Email: {relationship.anchorEmail}<br></br>
Arranger Email: {relationship.arrangerEmail}<br></br>
Relationship: {relationship.relationship}<br></br>
Relationship in Years: {relationship.relationshipYears}<br></br>
Status: {relationship.status}<br></br>
Vendor Contact: {relationship.vendorContact}<br></br>
Vendor Email: {relationship.vendorEmail}<br></br>
                </h5>
                </div>)
               }) }
            </div>
            </div>}
            {props?.userData?.type=='company' && userDataDetails.tcapRelation=='anchor' && <div>
            <h1>{userDataDetails.tcapRelation} Relationships</h1>
            <div>
               {relationships.map((relationship)=>{
                return(<div style={{border:'1px grey solid'}} key={relationship.id}> 
                <h5>
                   anchorApproverEmail: {relationship.anchorApproverEmail}<br></br>
Anchor Contact: {relationship.anchorContact}<br></br>
Anchor Email: {relationship.anchorEmail}<br></br>
Arranger Email: {relationship.arrangerEmail}<br></br>
Relationship: {relationship.relationship}<br></br>
Relationship in Years: {relationship.relationshipYears}<br></br>
Status: {relationship.status}<br></br>
Vendor Contact: {relationship.vendorContact}<br></br>
Vendor Email: {relationship.vendorEmail}<br></br>
                </h5>
                </div>)
               }) }
            </div>
            </div>}
        </div>
      </div>
    );
}
