import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom'
import { fireEvent } from '@testing-library/react';
var form=require("./component/Form")
var myModule = require("./component/Header");
var home=require("./component/Welcome.jsx")
const axios=require("axios").default;



describe('form fields should exisit', () => { 
  test('check form fields present', () => {
  render(
  <Router>
    <myModule.Header/>,
    <form.Form />,
    <home.Welcome/>,
  </Router>,
  );

  // Lable and Title
  const title = screen.getByText(/Let's Get Started/i);
  expect(title).toBeInTheDocument();

  const first = screen.getByTestId("first")
  expect(first).toBeInTheDocument();

  const middle = screen.getByTestId("middle")
  expect(middle).toBeInTheDocument();

  const last = screen.getByTestId("last")
  expect(last).toBeInTheDocument();

  const mailid = screen.getByTestId("mail")
  expect(mailid).toBeInTheDocument();

  const mobile = screen.getByTestId("mobile")
  expect(mobile).toBeInTheDocument();

  const but = screen.getByRole("button")
  expect(but).toBeInTheDocument();
});


describe('Form field should be empty',()=>{

  it("fields should be empty",()=>{
    render(
    <Router>
    <form.Form/>,
    </Router>);
    const first=screen.getByPlaceholderText("firstName")
    expect(first.value).toBe("")

    const middle=screen.getByPlaceholderText("middleName")
    expect(middle.value).toBe("")

    const last=screen.getByPlaceholderText("lastName")
    expect(last.value).toBe("")

    const email=screen.getByPlaceholderText("email")
    expect(email.value).toBe("")

    const phone=screen.getByPlaceholderText("phone")
    expect(phone.value).toBe("")


  })
});


describe("email test",()=>{
  test("email should have @",()=>{
    const mail="aer@email.com"
    const not="aeremail.com"
    expect(mail.includes("@")).toBe(true);
    expect(not.includes("@")).toBe(false);
  })
});

describe("phone number test",()=>{
  test("phone number should be 10 digit",()=>{
    const phone='8870037045';
    const not='88908676'
    expect(phone).toHaveLength(10);
  })
});

})