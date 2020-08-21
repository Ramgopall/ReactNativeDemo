import { gql } from '@apollo/client';
const CHECK_USER = gql`
query($email: String, $password: String) {
  Users(where: {email: {_eq: $email}, password:{_eq: $password}}) {
    id,
    email,
    password,
    name
  }
}
`;
const CREATE_USER = gql`
mutation($email: String, $password: String, $name: String) {
  insert_Users(objects: {email: $email, password: $password, name: $name}) {
    returning {
      email
      id
      password
      name
    }
  }
}
`;
export { CHECK_USER, CREATE_USER };
