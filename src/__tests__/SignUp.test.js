import { render, screen,act } from '@testing-library/react';
import SignUp from "../components/SignUp";

import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';



const MockedSignUp=()=>{
    return (
        <BrowserRouter>
        <SignUp/>
        </BrowserRouter>
    )
}
describe("SignUp Testing",()=>{
    test("is Name validates",()=>{
        render(<MockedSignUp/>);
        const nameElement=screen.getByTestId("name")
        act(()=> userEvent.type(nameElement, "56464612"))
        const nameError=screen.getByText("Please Enter the Valid Name")
        expect(nameError).toBeInTheDocument();

    })
    test("is Contact validates",()=>{
        render(<MockedSignUp/>);
        const contactElement=screen.getByTestId("contact")
        act(()=> userEvent.type(contactElement, "abcd"))
        const contactError=screen.getByText("Please Enter the Valid Contact Number")
        expect(contactError).toBeInTheDocument();

    })
    test("is Email validates",()=>{
        render(<MockedSignUp/>);
        const emailElement=screen.getByTestId("email")
        act(()=> userEvent.type(emailElement, "falgungmail.com"))
        const emailError=screen.getByText("Please Enter the Valid Email Id")
        expect(emailError).toBeInTheDocument();

    })
    test("is Password validates",()=>{
        render(<MockedSignUp/>);
        const passwordElement=screen.getByTestId("password")
        act(()=> userEvent.type(passwordElement, "falgun"))
        const passwordError=screen.getByText("Password must be atleast 8 characters long")
        expect(passwordError).toBeInTheDocument();

    })
    test("Role of the user",()=>{
        render(<MockedSignUp/>);
        const RoleElement=screen.getByRole("button",{
            name:/select/i
        })
        act(()=> userEvent.click(RoleElement))
        const serviceProvider=screen.getByRole("option",{
            name:"Service Provider"
        })
        userEvent.click(serviceProvider)
        expect(screen.getByText("Service Provider")).toBeInTheDocument()
        const Customer=screen.getByRole("option",{
            name:"Customer"
        })
        userEvent.click(Customer)
        expect(screen.getByText("Customer")).toBeInTheDocument()

    })
   test("is signup button disabled",()=>{
    render(<MockedSignUp/>);
    const passwordElement=screen.getByTestId("password")
    act(()=> userEvent.type(passwordElement, "falgun"))
    const signup=screen.getByRole("button",{
        name:"Sign Up"
    })
    expect(signup).toBeDisabled();
   })
})
 
