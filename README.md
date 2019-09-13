# Mocking Tweets

This project is designed to demonstrate an interesting way of mocking GraphQL within Storybook. This technique allows full integration testing of components, independantly of an external api. These components could can be packaged, released and used anywhere within the scope of the Toast graphql schema.

## Available Scripts

In the project directory, you can run:

### `npm storybook`

### `npm test`

## React Test Library

### getByTestId

Using getByTestId helps prepare you interface for end-to-end testing. Its also encouraged that we target components via roles as this leaves us with more accessabler components.

---

Custom matchers:

* toBeDisabled
* toBeEnabled
* toBeEmpty
* toBeInTheDocument
* toBeInvalid
* toBeRequired
* toBeValid
* toBeVisible
* toContainElement
* toContainHTML
* toHaveAttribute
* toHaveClass
* toHaveFocus
* toHaveFormValues
* toHaveStyle
* toHaveTextContent
* toHaveValue
