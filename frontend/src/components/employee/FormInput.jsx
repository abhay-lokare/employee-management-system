import "./FormInput.css";

function FormInput({

                       label,
                       type = "text",
                       placeholder,
                       value = "",
                       options = []

                   }) {

    return (

        <div className="form-input">

            <label>

                {label}

            </label>

            {

                type === "select"

                    ? (

                        <select defaultValue={value}>

                            {

                                options.map((option) => (

                                    <option
                                        key={option}
                                        value={option}
                                    >

                                        {option}

                                    </option>

                                ))

                            }

                        </select>

                    )

                    : (

                        <input

                            type={type}

                            placeholder={placeholder}

                            defaultValue={value}

                        />

                    )

            }

        </div>

    );

}

export default FormInput;