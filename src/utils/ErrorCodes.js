const deepFreeze = (obj) => {
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = obj[prop];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
};

const ErrorCodes = deepFreeze({
  ORDER: {
    NO_ORDERED_PRODUCT: 'ORD-4001',
    ORDER_NOT_FOUND: 'ORD-4041',
  },
  CART: {
    PRODUCT_ID_REQUIRED: 'CRT-4001',
    CART_NOT_FOUND: 'CRT-4041',
  },
  JWT: {
    UNSUPPORTED_FORMAT: 'JWT-4001',
    INVALID_STRUCTURE: 'JWT-4002',
    INVALID_SIGNATURE: 'JWT-4003',
    TOKEN_EXPIRED: 'JWT-4011',
    USER_NOT_FOUND: 'JWT-4041',
  },
  REFRESH_TOKEN: {
    ACCESS_TOKEN_VALID: 'RFT-4001',
    TOKEN_EXPIRED: 'RFT-4011',
    TOKEN_NOT_FOUND: 'RFT-4042',
    COOKIE_TOKEN_NOT_FOUND: 'RFT-4043',
  },
  USER: {
    USER_NOT_FOUND: 'USR-4041',
    NO_PERMISSION: 'USR-4031',
    USER_ALREADY_EXISTS: 'USR-4091',
    PASSWORD_MISMATCH: 'USR-4092',
  },
  STORE: {
    STORE_NOT_FOUND: 'STO-4041',
    NOT_MANAGED_STORE: 'STO-4042',
  },
  PRODUCT: {
    PRODUCT_NOT_FOUND: 'PRD-4041',
    NO_PRODUCT_IN_TYPE: 'PRD-4042',
  },
  TYPE: {
    TYPE_NOT_FOUND: 'TYP-4041',
  },
  VALIDATION: {
    INVALID_INPUT: 'VAL-4001',
  },
  COMMON: {
    INVALID_INPUT: 'CMM-4001',
  },
});

export default ErrorCodes;
