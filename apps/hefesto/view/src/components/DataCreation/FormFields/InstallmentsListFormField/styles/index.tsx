import styled from "styled-components";
import { motion } from "framer-motion";

export const InstallmentFormFieldWrapper = styled.div`
  @media (min-width: 1024px) {
    .installmentValue {
      .MuiFormLabel-root {
        font-size: 0.85rem;
      }

      .MuiInputBase-root {
        max-width: 250px;
      }

      .MuiInputBase-input {
        max-width: 300px !important;
      }
    }

    .installmentNumber {
      .MuiFormLabel-root {
        font-size: 0.75rem;
      }

      .MuiInputBase-root {
        max-width: 150px !important;
      }

      .MuiInputBase-input {
        max-width: 100px !important;
      }
    }
  }

  display: flex;
  justify-content: space-between;
  align-items: center;

  .MuiSvgIcon-root {
    font-size: 0.75rem;
  }

  .installmentNumber {
    .MuiFormLabel-root {
      font-size: 0.75rem;
    }

    .MuiInputBase-root {
      max-width: 100px;
    }

    .MuiInputBase-input {
      max-width: 50px;
    }
  }

  .installmentValue {
    .MuiFormLabel-root {
      font-size: 0.85rem;
    }

    .MuiInputBase-root {
      max-width: 150px;
    }

    .MuiInputBase-input {
      max-width: 100px;
    }
  }
`;
