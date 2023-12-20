import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  switch (action) {
    case ACTION.CREATE:
      // created 'card' 'title'
      return `created ${entityType.toLowerCase()} "${entityTitle}"`;

    case ACTION.DELETE:
      // created 'card' 'title'
      return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;

    case ACTION.UPDATE:
      // created 'card' 'title'
      return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `unknown action ${entityType.toLowerCase()} "${entityTitle}"`;
  }
};
