import CheckBox from "../checkBox/CheckBox";

const NestedCheckboxes = ({data, handleOnChange}) => {
    return (
        <div>
            {data.map((item) => (
                <div className="nested-checkbox-container" key={`${item.id}-${item.index}`}>
                    <CheckBox label={item.label} id={item.id} status={item.status} handleOnChange={handleOnChange}/>
                    {item.children && <NestedCheckboxes data={item.children} handleOnChange={handleOnChange}/>}
                </div>
            )) }
        </div>
    )
}

export default NestedCheckboxes;