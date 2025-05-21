// This file is clean of linting errors for testing purposes.

function greet(name: string): string {
  const message = `Hello, ${name}!`;
  return message;
}

const personName = "World";
console.log(greet(personName));

export default greet;
