import React from 'react';
import { Box, Paper } from '@mui/material';
import '../styles/app.css'
const BoxLayout = ({ children }) => {
    // Define color variables
    const primaryColor = '#F44336';
    const secondaryColor = '#3F51B5';
    const backgroundColor = 'transparent';

    return (
        <div className="al-main">
            <div className="al-content">
                    <div className="content-top clearfix">
                        {children}
                    {/*<div className="col-xlg-3 col-lg-6 col-md-6 col-xs-12">*/}
                    {/*    <div className="panel xmedium-panel feed-comply-panel with-scroll todo-panel animated zoomIn"*/}
                    {/*         ><div className="panel-heading clearfix">*/}
                    {/*        <h3 className="panel-title">To Do List</h3>*/}
                    {/*    </div><div className="panel-body">*/}
                    {/*        /!*<div className="ng-scope">*!/*/}
                    {/*        /!*    <div className="task-todo-container" *!/*/}
                    {/*        /!*         >*!/*/}
                    {/*        /!*        <input type="text" value="" *!/*/}
                    {/*        /!*               className="form-control task-todo ng-pristine ng-untouched ng-valid ng-empty" *!/*/}
                    {/*        /!*               placeholder="Task to do.."/>*!/*/}
                    {/*        /!*        <i className="add-item-icon ion-plus-round"></i>*!/*/}
                    {/*        /!*        <div className="box-shadow-border"></div>*!/*/}
                    {/*        /!*        <ul className="todo-list ng-pristine ng-untouched ng-valid ng-isolate-scope ui-sortable ng-not-empty" *!/*/}
                    {/*        /!*            >*!/*/}
                    {/*        /!*            <li className="ng-scope ui-sortable-handle">*!/*/}
                    {/*        /!*                <div className="blur-container">*!/*/}
                    {/*        /!*                    <div className="blur-box"></div></div>*!/*/}
                    {/*        /!*                <i className="mark" style={{backgroundColor: "#6eba8c"}}></i> *!/*/}
                    {/*        /!*                <label className="todo-checkbox custom-checkbox custom-input-success">*!/*/}
                    {/*        /!*                    <input type="checkbox"*!/*/}
                    {/*        /!*                           className="ng-pristine ng-untouched ng-valid ng-empty"/>*!/*/}
                    {/*        /!*                    <span className="cut-with-dots ng-binding">Check me out</span></label>*!/*/}
                    {/*        /!*                <i className="remove-todo ion-ios-close-empty" *!/*/}
                    {/*        /!*                ></i></li>*!/*/}
                    {/*        /!*            </ul></div>*!/*/}
                    {/*        /!*</div>*!/*/}
                    {/*    </div>*/}
                    {/*    </div></div></div>*/}
                    </div>
            </div>
        </div>
    );
};

export default BoxLayout;
