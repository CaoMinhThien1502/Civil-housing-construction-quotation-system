import React from 'react';
import 'bootstrap';
import { Check, CheckBox } from '@mui/icons-material';

function Register() {
    return (
        <form class='form-control border border-info'>
            <h1 class="display-1 text-center">Register</h1>
            <br></br>
            <div class="row">
                <div class="form-group col-6">
                    <label for="name">User name</label>
                    <input type="text" class="form-control" id="name" placeholder="Nguyen Van A"/>
                </div>
                <div class="form-group col-6">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="name@example.com"/>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-6">
                    <label for="phone">Phone number</label>
                    <input type="text" class="form-control" id="phone" placeholder="0xxxxxxxxx"/>
                </div>
                <div class="form-group col-6">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" id="address" placeholder="Ho Chi Minh"/>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-6">
                    <label for="birthday">Birthday</label>
                    <input type="date" class="form-control" id="birthday"/>
                </div>
                <div class="form-group col-6" >
                    <label class="col-sm-2 col-form-label" for="gender">Gender</label>
                    <div class="row">
                        <div class="form-check col-6">
                            <input class="form-check-input" type="radio" value="1" name="flexRadioDefault" id="gender" checked/>
                            <label class="form-check-label" for="gender">
                                Male
                            </label>
                        </div>
                        <div class="form-check col-6">
                            <input class="form-check-input" type="radio" value="0" name="flexRadioDefault" id="gender2"/>
                            <label class="form-check-label" for="gender2">
                                Female
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-6">
                    <label for="pass">Password</label>
                    <input type="password" class="form-control" id="pass" placeholder="Enter password"/>
                </div>
                <div class="form-group col-6">
                    <label for="conpass">Address</label>
                    <input type="password" class="form-control" id="conpass" placeholder="Enter confirm password"/>
                </div>
            </div>
            <br></br>
            <div class="row center">
                <div class="col-4"></div>
                <button class="btn btn-primary col-4 align-self-center" type="submit">Submit form</button>
            </div>
        </form>
    );
}

export default Register;