# Development Guide
This document provides step-by-step instructions for cloning and running the project in your local environment.
The envireoment and all these setup required for backend only so firstly
```sh
npm run backend
```

### [Enironmental variables](#enironmental-variable)
### [Gmail setup](#gmail-setup)



## Enironmental variable
The repository currently comprises three environments. Please create the environment file based on the specific environment you are operating.
| Environment   | Environmental File     | Run Command        |
|---------------|------------------------|--------------------|
| Development   | .env.development       | npm run dev        |

Duplicate the `.env.test` file into your environment variable file.

Substitute the right-hand value of each environment variable with the corresponding value (you can obtain these values by following the next step in the documentation).

## Gmail setup
- Establish a Gmail account if you don't already have one.
- Log in to your Gmail account and choose "Manage your Google Account".
- Head to the Security tab on the left panel.
- Enable 2-step verification if it's not already activated.
- Scroll down to the App passwords section and generate a new app password.
- Securely store this generated password in a safe location for use.


## All set! 
In a new terminal, execute the following command to initiate the development environment.
```sh
npm run dev
```