import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Groups2Icon from "@mui/icons-material/Groups2";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import {useNavigate} from "react-router-dom";
function IndustryTable(props) {
    const navigate = useNavigate()
    const handleEdit = (id) => {
        navigate(`/newIndustry/${id}`)
    }
    const handleDelete = () => {}
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
                                <td className="ng-binding">{d.website}</td>
                                <td className="ng-binding">{d.representative}</td>
                                <td className="ng-binding">{d.industry?.name}</td>
                                <td className="ng-binding">{d.agenda?.name}</td>
                                <td>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <span style={{cursor: "pointer"}} onClick={() => handleEdit(d.id)}>
                        <EditIcon sx={{fontSize: '18px'}}/>
                    </span>
                                        <span style={{cursor: "pointer"}} onClick={() => handleDelete(d.id)}>
                        <Delete sx={{fontSize: '18px'}}/>
                    </span>
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

export default IndustryTable;
