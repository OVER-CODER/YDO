// @ts-nocheck
import { browser } from "$app/environment";
import { writable } from "svelte/store";

//string
export const userName = writable(
  (browser && localStorage.getItem("userName")) || "hello world"
);
userName.subscribe((val) => browser && (localStorage.userName = val));

// array
const storedChoices = JSON.parse(browser && localStorage.getItem("choices")) || [
  "","","","",""
];
export const choices = writable(browser && storedChoices);
choices.subscribe(
  (val) => browser && (localStorage.choices = JSON.stringify(val))
);

// object
const storedUser = JSON.parse(browser && localStorage.getItem("user")) || {
  exists: false,
  name: "",
  email: "",
  roll_no: "",
};
export const  user = writable(browser && storedUser);
user.subscribe(
  (val) => browser && (localStorage.user = JSON.stringify(val))
)