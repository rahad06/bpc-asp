import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import axios from "axios";

class AsyncSelectEditor extends Component {
    state = { data: [], value: null, loading: true };
    async componentDidMount() {
        let data;

            data = [];

        data = data.map((el) => {
            return {
                label:
                    el[(this.props.dataType?.nameField ?? "Name")] ??
                    el[this.props.dataType?.nameField ?? "name"],
                value:
                    el[(this.props.dataType?.valueField ?? "Id")] ?? el[this.props.dataType?.valueField ?? "id"],
            };
        });


        this.setState({ loading: false, data });
        if (this.props.isMultiple) this.setState({ value: this.props.value });
        else this.setState({ value: data.find((el) => el.value === this.props.value) });
    }
    loadOptions = async (inputVal, changeData) => {
        let data = await axios().post(this.props.dataType?.url, {
            fields: [
                (this.props.dataType?.nameField ?? "name"),
                (this.props.dataType?.valueField ?? "Id"),
            ],
            search: inputVal,
        });
        data = data.map((el) => {
            return {
                label:
                    el[(this.props.dataType?.nameField ?? "Name")] ??
                    el[this.props.dataType?.nameField ?? "name"],
                value:
                    el[(this.props.dataType?.valueField ?? "Id")] ?? el[this.props.dataType?.valueField ?? "id"],
            };
        });
        changeData(data);
    };
    render() {
        if (this.state.loading) return null;
        return (
            <div
                className={`${this.props.inRow ? "" : "mb-3"} ${this.props.half ? "col-sm-6" : ""} ${
                    this.props.notValidProperties?.findIndex((p) => p.name === this.props.dataType?.name) !== -1
                        ? "not-valid-form"
                        : ""
                } ${this.props.className}`}
            >
                {this.props.inRow ? null : (
                    <label className="form-label">
                        {this.props.title}{" "}
                    </label>
                )}
                {this.props.createable ? (
                    <AsyncCreatableSelect
                        isMulti={this.props.isMultiple}
                        // isCreatable={this.props.createable}
                        cacheOptions
                        defaultOptions={this.props.defaultOptions ?? true}
                        defaultValue={this.state.value}
                        loadOptions={this.props.loadOptions ?? this.loadOptions}
                        onChange={(el) => {
                            this.setState({ value: el });
                            this.props.onChange(el);
                        }}
                        value={this.state.value}
                        formatCreateLabel={(e) =>{}
                        }
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                ) : (
                    <AsyncSelect
                        isMulti={this.props.isMultiple}
                        // isCreatable={this.props.createable}
                        cacheOptions
                        defaultOptions={this.props.defaultOptions ?? true}
                        defaultValue={this.state.value}
                        loadOptions={this.props.loadOptions ?? this.loadOptions}
                        onChange={(el) => {
                            this.setState({ value: el });
                            this.props.onChange(el);
                        }}
                        value={this.state.value}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                )}

            </div>
        );
    }
}

export default AsyncSelectEditor;
