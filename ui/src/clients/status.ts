import request from './request'

import {TaskwarriorDataType} from './tasks'

export interface URLList {
  login: string
  logout: string
  about: string
  generate_new_certificate: string
  ca_certificate: string
  my_certificate: string
  my_key: string
  taskrc_extras: string
  taskd_settings: string
  taskd_reset: string
  email_integration: string
  twilio_integration: string
  tos_accept: string
  privacy_policy_accept: string
  clear_task_data: string
  set_colorscheme: string
  enable_sync: string
  mirakel_configuration: string
  configure_pebble_cards: string
  configure_feed: string
  configure_ical: string
  user_status: string
  announcements: string
  refresh: string
  clear_lock: string
  sync_init: string
  revert_to_last_commit: string
  sync: string
  trello_authorization_url: string
  trello_resynchronization_url: string
  trello_reset_url: string
  deduplicate_tasks: string
  deduplication_config: string
  status_feed: string
  delete_account: string
}

export interface UdaDefinition {
  field: string
  label: string
  type: TaskwarriorDataType
}

export const enum SmsReply {
  ALWAYS = 9,
  ERROR = 5,
  NEVER = 0,
}

export interface BaseStatus {
  logged_in: boolean | null
  urls?: URLList
}

export interface AuthenticatedStatus extends BaseStatus {
  uid: number
  username: string
  name: string
  email: string
  configured: boolean
  taskd_credentials: string
  taskd_server: string
  taskd_server_is_default: boolean
  streaming_enabled: boolean
  streaming_key: string
  taskd_files: boolean
  twilio_auth_token: string
  sms_whitelist: string
  sms_arguments: string
  sms_replies: SmsReply
  email_whitelist: string
  task_creation_email_address: string
  taskrc_extras: string
  api_key: string
  tos_up_to_date: boolean
  privacy_policy_up_to_date: boolean
  feed_url: string
  ical_waiting_url: string
  ical_due_url: string
  sms_url: string
  colorscheme: string
  repository_head: string
  sync_enabled: boolean
  pebble_cards_enabled: boolean
  feed_enabled: boolean
  ical_enabled: boolean
  auto_deduplicate: boolean
  trello_board_url: string | null
  system_udas: UdaDefinition[]
  udas: UdaDefinition[]
}

export interface UnauthenticatedStatus extends BaseStatus {
  logged_in: false
}

export interface UndeterminedStatus extends BaseStatus {
  logged_in: null
}

export type Status =
  | AuthenticatedStatus
  | UnauthenticatedStatus
  | UndeterminedStatus

export async function getStatus(): Promise<Status> {
  return request<Status>('GET', 'user/status', {})
}
