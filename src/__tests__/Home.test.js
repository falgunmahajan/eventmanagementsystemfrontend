import { render } from "@testing-library/react"
import Navbar from "../components/Navbar"

describe("Home Component",()=>{
    test("Navbar",()=>{
        render(<Navbar/>)
    })
})