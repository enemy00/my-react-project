import {Form, Formik, Field} from "formik";
import * as React from "react";
import {FilterType} from "../../redux/usersReducer";
import s from "./Users.module.css";

type FormType = {
    term: string
    friend: string
}

type PropsType = {
    filterChanged: (filter: FilterType) => void
}

const UsersSearch: React.FC<PropsType> = React.memo((props) => {

        const submitData = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
            const filter: FilterType = {
                term: values.term,
                friend: values.friend === "null" ? null : values.friend === "true" ? true : false
            }
            props.filterChanged(filter)
            setSubmitting(false)
        }

        return <div>
            <Formik
                initialValues={{term: "", friend: "null"}}
                onSubmit={submitData}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field className={s.searcher} type={"text"} name={"term"} placeholder={"For example: \"dog\""}/>
                        <Field className={s.friendBox} name={"friend"} as={"select"}>
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <div>
                            <button className={s.searchButton} type={"submit"} disabled={isSubmitting}>Find</button>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>

    }
)
export default UsersSearch;
