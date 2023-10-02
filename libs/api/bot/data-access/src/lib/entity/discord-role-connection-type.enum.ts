import { registerEnumType } from '@nestjs/graphql'

export enum DiscordRoleConnectionType {
  integerLessThanOrEqual = 'integerLessThanOrEqual',
  integerGreaterThanOrEqual = 'integerGreaterThanOrEqual',
  integerEqual = 'integerEqual',
  integerNotEqual = 'integerNotEqual',
  dateTimeLessThanOrEqual = 'dateTimeLessThanOrEqual',
  dateTimeGreaterThanOrEqual = 'dateTimeGreaterThanOrEqual',
  booleanEqual = 'booleanEqual',
  booleanNotEqual = 'booleanNotEqual',
}

registerEnumType(DiscordRoleConnectionType, { name: 'DiscordRoleConnectionType' })

export function convertDiscordRoleConnectionTypeToNumber(type: DiscordRoleConnectionType): number {
  switch (type) {
    case DiscordRoleConnectionType.integerLessThanOrEqual:
      return 1
    case DiscordRoleConnectionType.integerGreaterThanOrEqual:
      return 2
    case DiscordRoleConnectionType.integerEqual:
      return 3
    case DiscordRoleConnectionType.integerNotEqual:
      return 4
    case DiscordRoleConnectionType.dateTimeLessThanOrEqual:
      return 5
    case DiscordRoleConnectionType.dateTimeGreaterThanOrEqual:
      return 6
    case DiscordRoleConnectionType.booleanEqual:
      return 7
    case DiscordRoleConnectionType.booleanNotEqual:
      return 8
    default:
      throw new Error(`Unknown DiscordRoleConnectionType ${type}`)
  }
}

export function convertNumberToDiscordRoleConnectionType(type: number): DiscordRoleConnectionType {
  switch (type) {
    case 1:
      return DiscordRoleConnectionType.integerLessThanOrEqual
    case 2:
      return DiscordRoleConnectionType.integerGreaterThanOrEqual
    case 3:
      return DiscordRoleConnectionType.integerEqual
    case 4:
      return DiscordRoleConnectionType.integerNotEqual
    case 5:
      return DiscordRoleConnectionType.dateTimeLessThanOrEqual
    case 6:
      return DiscordRoleConnectionType.dateTimeGreaterThanOrEqual
    case 7:
      return DiscordRoleConnectionType.booleanEqual
    case 8:
      return DiscordRoleConnectionType.booleanNotEqual
    default:
      throw new Error(`Unknown DiscordRoleConnectionType ${type}`)
  }
}
