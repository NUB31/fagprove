/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Category = "category",
	Comments = "comments",
	Ideas = "ideas",
	Status = "status",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CategoryRecord = {
	name?: string
	owner: RecordIdString
}

export type CommentsRecord = {
	attachments?: string[]
	body: HTMLString
	created_by: RecordIdString
	idea: RecordIdString
	responding_to?: RecordIdString
}

export type IdeasRecord = {
	attachments?: string[]
	category?: RecordIdString
	created_by: RecordIdString
	description?: HTMLString
	status: RecordIdString
	title?: string
	votes: number
}

export type StatusRecord = {
	name: string
}

export type UsersRecord = {
	access_level?: number
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CategoryResponse<Texpand = unknown> = Required<CategoryRecord> & BaseSystemFields<Texpand>
export type CommentsResponse<Texpand = unknown> = Required<CommentsRecord> & BaseSystemFields<Texpand>
export type IdeasResponse<Texpand = unknown> = Required<IdeasRecord> & BaseSystemFields<Texpand>
export type StatusResponse<Texpand = unknown> = Required<StatusRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	category: CategoryRecord
	comments: CommentsRecord
	ideas: IdeasRecord
	status: StatusRecord
	users: UsersRecord
}

export type CollectionResponses = {
	category: CategoryResponse
	comments: CommentsResponse
	ideas: IdeasResponse
	status: StatusResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'category'): RecordService<CategoryResponse>
	collection(idOrName: 'comments'): RecordService<CommentsResponse>
	collection(idOrName: 'ideas'): RecordService<IdeasResponse>
	collection(idOrName: 'status'): RecordService<StatusResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
