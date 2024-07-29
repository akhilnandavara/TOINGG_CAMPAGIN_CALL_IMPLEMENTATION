# Campaign Form Application

## Overview

This application provides a form for creating and updating campaigns. It includes features such as language and voice selection, script input with character count, and file upload. It interacts with an external API to fetch supported languages and voices, and performs CRUD operations for campaigns. Additionally, password encryption has been implemented using `bcrypt` for enhanced security.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create and update campaigns with various fields.
- Select language and voice from fetched data.
- Display character count for the script input.
- Upload files with campaign data.
- **Password encryption**: Utilizes `bcrypt` to securely handle user passwords.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Vite**: Build tool and development server.
- **Axios**: HTTP client for making API requests.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **bcrypt**: Library for hashing and encrypting passwords.

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akhilnandavara/TOINGG_CAMPAGIN_CALL_IMPLEMENTATION.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```

3. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_AUTH_KEY=your-auth-key
   VITE_TOINGG_API_URL=https://www.toingg.com/api/v3
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser and go to `http://localhost:5173`.

## Usage

- **Create Campaign**: Fill out the form and submit to create a new campaign.
- **Update Campaign**: Navigate to the update page and submit the updated campaign details.
- **Login/Signup**: User authentication now includes password encryption using `bcrypt`.

## API Integration

### Endpoints

- **GET** `/get_supported_languages` - Fetches supported languages.
- **GET** `/get_supported_voices` - Fetches supported voices.
- **GET** `/get_campaigns` - Fetches existing campaign data.
- **POST** `/api/create-campaign` - Creates a new campaign.
- **PUT** `/api/campaigns/` - Updates an existing campaign.

### Configuration

The API base URL is set in the `.env` file under `VITE_TOINGG_API_URL`. The authentication token is also configured via `VITE_AUTH_KEY`.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.