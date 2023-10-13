﻿import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Groups2Icon from "@mui/icons-material/Groups2";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import {useNavigate} from "react-router-dom";
function CompanyTable(props) {
    const navigate = useNavigate()
const handleEdit = (id) => {
        navigate(`/newCompany/${id}`)
}
    return (
        <div className="panel-body">
            <div className="ng-scope">
                <div className="vertical-scroll" style={{overflow:'auto'}}>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            {props.headers.map((h,i) => (
                                <th key={i}>{h.header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {props.data?.map((d, i) => (
                            <tr className="ng-scope" key={i}>
                                <td className="ng-binding table-id">{d.id}</td>
                                <td className="ng-binding">{d.name}</td>
                                <td className="ng-binding">{d.industry?.name}</td>
                                <td className="ng-binding">{d.contactName}</td>
                                <td className="ng-binding">{d.salutation}</td>
                                <td className="ng-binding">{d.mobile}</td>
                                <td className="ng-binding">{d.phone}</td>
                                <td className="ng-binding">{d.email}</td>
                                <td className="ng-binding">{d.webpage}</td>
                                <td className="ng-binding">{d.address}</td>
                                <td className="ng-binding">{d.comments}</td>
                                <td className="ng-binding">{d.employees}</td>
                                <td className="ng-binding">{d.experience}</td>
                                <td className="ng-binding">{d.registroMercantil}</td>
                                <td className="ng-binding">{d.identificacionNacional}</td>
                            <td>
                                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <span style={{cursor: "pointer"}} onClick={() => handleEdit(d.id)}>
                        <EditIcon sx={{fontSize: '18px'}}/>
                    </span>
                                    <span style={{cursor: "pointer"}} onClick={() => props.handleDelete(d.id)}>
                        <Delete sx={{fontSize: '18px'}}/>
                    </span>
                            {/*        <span style={{cursor: "pointer"}} onClick={() => handleMeetings(d.id)}>*/}
                            {/*    <Groups2Icon sx={{fontSize: '18px'}}/>*/}
                            {/*</span>*/}
                            {/*        <span style={{cursor: "pointer"}} onClick={() => handleOffer(d.id)}>*/}
                            {/*    <LocalOfferIcon sx={{fontSize: '18px'}}/>*/}
                            {/*</span>*/}
                            {/*        <span style={{cursor: "pointer"}} onClick={() => handleFinal(d.id)}>*/}
                            {/*    <MeetingRoomIcon sx={{fontSize: '18px'}}/>*/}
                            {/*</span>*/}
                                </div>
                            </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CompanyTable;
