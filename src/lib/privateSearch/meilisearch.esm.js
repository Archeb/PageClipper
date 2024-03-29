import crypto from 'crypto';

// Type definitions for meilisearch
// Project: https://github.com/meilisearch/meilisearch-js
// Definitions by: qdequele <quentin@meilisearch.com> <https://github.com/meilisearch>
// Definitions: https://github.com/meilisearch/meilisearch-js
// TypeScript Version: ^3.8.3
/*
 * SEARCH PARAMETERS
 */
const MatchingStrategies = {
    ALL: 'all',
    LAST: 'last',
};
const ContentTypeEnum = {
    JSON: 'application/json',
    CSV: 'text/csv',
    NDJSON: 'application/x-ndjson',
};
/*
 ** TASKS
 */
const TaskStatus = {
    TASK_SUCCEEDED: 'succeeded',
    TASK_PROCESSING: 'processing',
    TASK_FAILED: 'failed',
    TASK_ENQUEUED: 'enqueued',
    TASK_CANCELED: 'canceled',
};
const TaskTypes = {
    DOCUMENTS_ADDITION_OR_UPDATE: 'documentAdditionOrUpdate',
    DOCUMENT_DELETION: 'documentDeletion',
    DUMP_CREATION: 'dumpCreation',
    INDEX_CREATION: 'indexCreation',
    INDEX_DELETION: 'indexDeletion',
    INDEXES_SWAP: 'indexSwap',
    INDEX_UPDATE: 'indexUpdate',
    SETTINGS_UPDATE: 'settingsUpdate',
    SNAPSHOT_CREATION: 'snapshotCreation',
    TASK_CANCELATION: 'taskCancelation',
    TASK_DELETION: 'taskDeletion',
};
const ErrorStatusCode = {
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#index_creation_failed */
    INDEX_CREATION_FAILED: 'index_creation_failed',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_index_uid */
    MISSING_INDEX_UID: 'missing_index_uid',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#index_already_exists */
    INDEX_ALREADY_EXISTS: 'index_already_exists',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#index_not_found */
    INDEX_NOT_FOUND: 'index_not_found',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_index_uid */
    INVALID_INDEX_UID: 'invalid_index_uid',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#index_not_accessible */
    INDEX_NOT_ACCESSIBLE: 'index_not_accessible',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_index_offset */
    INVALID_INDEX_OFFSET: 'invalid_index_offset',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_index_limit */
    INVALID_INDEX_LIMIT: 'invalid_index_limit',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_state */
    INVALID_STATE: 'invalid_state',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#primary_key_inference_failed */
    PRIMARY_KEY_INFERENCE_FAILED: 'primary_key_inference_failed',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#index_primary_key_already_exists */
    INDEX_PRIMARY_KEY_ALREADY_EXISTS: 'index_primary_key_already_exists',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_index_primary_key */
    INVALID_INDEX_PRIMARY_KEY: 'invalid_index_primary_key',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#max_fields_limit_exceeded */
    DOCUMENTS_FIELDS_LIMIT_REACHED: 'document_fields_limit_reached',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_document_id */
    MISSING_DOCUMENT_ID: 'missing_document_id',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_document_id */
    INVALID_DOCUMENT_ID: 'invalid_document_id',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_content_type */
    INVALID_CONTENT_TYPE: 'invalid_content_type',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_content_type */
    MISSING_CONTENT_TYPE: 'missing_content_type',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_document_fields */
    INVALID_DOCUMENT_FIELDS: 'invalid_document_fields',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_document_limit */
    INVALID_DOCUMENT_LIMIT: 'invalid_document_limit',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_document_offset */
    INVALID_DOCUMENT_OFFSET: 'invalid_document_offset',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_document_filter */
    INVALID_DOCUMENT_FILTER: 'invalid_document_filter',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_document_filter */
    MISSING_DOCUMENT_FILTER: 'missing_document_filter',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_document_vectors_field */
    INVALID_DOCUMENT_VECTORS_FIELD: 'invalid_document_vectors_field',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#payload_too_large */
    PAYLOAD_TOO_LARGE: 'payload_too_large',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_payload */
    MISSING_PAYLOAD: 'missing_payload',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#malformed_payload */
    MALFORMED_PAYLOAD: 'malformed_payload',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#no_space_left_on_device */
    NO_SPACE_LEFT_ON_DEVICE: 'no_space_left_on_device',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_store_file */
    INVALID_STORE_FILE: 'invalid_store_file',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_ranking_rules */
    INVALID_RANKING_RULES: 'missing_document_id',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_request */
    INVALID_REQUEST: 'invalid_request',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_document_geo_field */
    INVALID_DOCUMENT_GEO_FIELD: 'invalid_document_geo_field',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_q */
    INVALID_SEARCH_Q: 'invalid_search_q',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_offset */
    INVALID_SEARCH_OFFSET: 'invalid_search_offset',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_limit */
    INVALID_SEARCH_LIMIT: 'invalid_search_limit',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_page */
    INVALID_SEARCH_PAGE: 'invalid_search_page',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_hits_per_page */
    INVALID_SEARCH_HITS_PER_PAGE: 'invalid_search_hits_per_page',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_attributes_to_retrieve */
    INVALID_SEARCH_ATTRIBUTES_TO_RETRIEVE: 'invalid_search_attributes_to_retrieve',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_attributes_to_crop */
    INVALID_SEARCH_ATTRIBUTES_TO_CROP: 'invalid_search_attributes_to_crop',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_crop_length */
    INVALID_SEARCH_CROP_LENGTH: 'invalid_search_crop_length',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_attributes_to_highlight */
    INVALID_SEARCH_ATTRIBUTES_TO_HIGHLIGHT: 'invalid_search_attributes_to_highlight',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_show_matches_position */
    INVALID_SEARCH_SHOW_MATCHES_POSITION: 'invalid_search_show_matches_position',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_filter */
    INVALID_SEARCH_FILTER: 'invalid_search_filter',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_sort */
    INVALID_SEARCH_SORT: 'invalid_search_sort',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_facets */
    INVALID_SEARCH_FACETS: 'invalid_search_facets',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_highlight_pre_tag */
    INVALID_SEARCH_HIGHLIGHT_PRE_TAG: 'invalid_search_highlight_pre_tag',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_highlight_post_tag */
    INVALID_SEARCH_HIGHLIGHT_POST_TAG: 'invalid_search_highlight_post_tag',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_crop_marker */
    INVALID_SEARCH_CROP_MARKER: 'invalid_search_crop_marker',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_matching_strategy */
    INVALID_SEARCH_MATCHING_STRATEGY: 'invalid_search_matching_strategy',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_vector */
    INVALID_SEARCH_VECTOR: 'invalid_search_vector',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_attributes_to_search_on */
    INVALID_SEARCH_ATTRIBUTES_TO_SEARCH_ON: 'invalid_search_attributes_to_search_on',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#bad_request */
    BAD_REQUEST: 'bad_request',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#document_not_found */
    DOCUMENT_NOT_FOUND: 'document_not_found',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#internal */
    INTERNAL: 'internal',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key */
    INVALID_API_KEY: 'invalid_api_key',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key_description */
    INVALID_API_KEY_DESCRIPTION: 'invalid_api_key_description',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key_actions */
    INVALID_API_KEY_ACTIONS: 'invalid_api_key_actions',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key_indexes */
    INVALID_API_KEY_INDEXES: 'invalid_api_key_indexes',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key_expires_at */
    INVALID_API_KEY_EXPIRES_AT: 'invalid_api_key_expires_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#api_key_not_found */
    API_KEY_NOT_FOUND: 'api_key_not_found',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_api_key_uid */
    IMMUTABLE_API_KEY_UID: 'immutable_api_key_uid',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_api_key_actions */
    IMMUTABLE_API_KEY_ACTIONS: 'immutable_api_key_actions',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_api_key_indexes */
    IMMUTABLE_API_KEY_INDEXES: 'immutable_api_key_indexes',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_api_key_expires_at */
    IMMUTABLE_API_KEY_EXPIRES_AT: 'immutable_api_key_expires_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_api_key_created_at */
    IMMUTABLE_API_KEY_CREATED_AT: 'immutable_api_key_created_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_api_key_updated_at */
    IMMUTABLE_API_KEY_UPDATED_AT: 'immutable_api_key_updated_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_authorization_header */
    MISSING_AUTHORIZATION_HEADER: 'missing_authorization_header',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#unretrievable_document */
    UNRETRIEVABLE_DOCUMENT: 'unretrievable_document',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#database_size_limit_reached */
    MAX_DATABASE_SIZE_LIMIT_REACHED: 'database_size_limit_reached',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#task_not_found */
    TASK_NOT_FOUND: 'task_not_found',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#dump_process_failed */
    DUMP_PROCESS_FAILED: 'dump_process_failed',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#dump_not_found */
    DUMP_NOT_FOUND: 'dump_not_found',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_swap_duplicate_index_found */
    INVALID_SWAP_DUPLICATE_INDEX_FOUND: 'invalid_swap_duplicate_index_found',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_swap_indexes */
    INVALID_SWAP_INDEXES: 'invalid_swap_indexes',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_swap_indexes */
    MISSING_SWAP_INDEXES: 'missing_swap_indexes',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_master_key */
    MISSING_MASTER_KEY: 'missing_master_key',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_types */
    INVALID_TASK_TYPES: 'invalid_task_types',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_uids */
    INVALID_TASK_UIDS: 'invalid_task_uids',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_statuses */
    INVALID_TASK_STATUSES: 'invalid_task_statuses',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_limit */
    INVALID_TASK_LIMIT: 'invalid_task_limit',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_from */
    INVALID_TASK_FROM: 'invalid_task_from',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_canceled_by */
    INVALID_TASK_CANCELED_BY: 'invalid_task_canceled_by',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_task_filters */
    MISSING_TASK_FILTERS: 'missing_task_filters',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#too_many_open_files */
    TOO_MANY_OPEN_FILES: 'too_many_open_files',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#io_error */
    IO_ERROR: 'io_error',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_index_uids */
    INVALID_TASK_INDEX_UIDS: 'invalid_task_index_uids',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_index_uid */
    IMMUTABLE_INDEX_UID: 'immutable_index_uid',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_index_created_at */
    IMMUTABLE_INDEX_CREATED_AT: 'immutable_index_created_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_index_updated_at */
    IMMUTABLE_INDEX_UPDATED_AT: 'immutable_index_updated_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_displayed_attributes */
    INVALID_SETTINGS_DISPLAYED_ATTRIBUTES: 'invalid_settings_displayed_attributes',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_searchable_attributes */
    INVALID_SETTINGS_SEARCHABLE_ATTRIBUTES: 'invalid_settings_searchable_attributes',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_filterable_attributes */
    INVALID_SETTINGS_FILTERABLE_ATTRIBUTES: 'invalid_settings_filterable_attributes',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_sortable_attributes */
    INVALID_SETTINGS_SORTABLE_ATTRIBUTES: 'invalid_settings_sortable_attributes',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_ranking_rules */
    INVALID_SETTINGS_RANKING_RULES: 'invalid_settings_ranking_rules',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_stop_words */
    INVALID_SETTINGS_STOP_WORDS: 'invalid_settings_stop_words',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_synonyms */
    INVALID_SETTINGS_SYNONYMS: 'invalid_settings_synonyms',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_distinct_attribute */
    INVALID_SETTINGS_DISTINCT_ATTRIBUTE: 'invalid_settings_distinct_attribute',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_typo_tolerance */
    INVALID_SETTINGS_TYPO_TOLERANCE: 'invalid_settings_typo_tolerance',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_faceting */
    INVALID_SETTINGS_FACETING: 'invalid_settings_faceting',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_pagination */
    INVALID_SETTINGS_PAGINATION: 'invalid_settings_pagination',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_before_enqueued_at */
    INVALID_TASK_BEFORE_ENQUEUED_AT: 'invalid_task_before_enqueued_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_after_enqueued_at */
    INVALID_TASK_AFTER_ENQUEUED_AT: 'invalid_task_after_enqueued_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_before_started_at */
    INVALID_TASK_BEFORE_STARTED_AT: 'invalid_task_before_started_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_after_started_at */
    INVALID_TASK_AFTER_STARTED_AT: 'invalid_task_after_started_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_before_finished_at */
    INVALID_TASK_BEFORE_FINISHED_AT: 'invalid_task_before_finished_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_after_finished_at */
    INVALID_TASK_AFTER_FINISHED_AT: 'invalid_task_after_finished_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_api_key_actions */
    MISSING_API_KEY_ACTIONS: 'missing_api_key_actions',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_api_key_indexes */
    MISSING_API_KEY_INDEXES: 'missing_api_key_indexes',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_api_key_expires_at */
    MISSING_API_KEY_EXPIRES_AT: 'missing_api_key_expires_at',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key_limit */
    INVALID_API_KEY_LIMIT: 'invalid_api_key_limit',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key_offset */
    INVALID_API_KEY_OFFSET: 'invalid_api_key_offset',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_facet_search_facet_name */
    INVALID_FACET_SEARCH_FACET_NAME: 'invalid_facet_search_facet_name',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_facet_search_facet_name */
    MISSING_FACET_SEARCH_FACET_NAME: 'missing_facet_search_facet_name',
    /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_facet_search_facet_query */
    INVALID_FACET_SEARCH_FACET_QUERY: 'invalid_facet_search_facet_query',
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class MeiliSearchCommunicationError extends Error {
    constructor(message, body, url, stack) {
        var _a, _b, _c;
        super(message);
        // Make errors comparison possible. ex: error instanceof MeiliSearchCommunicationError.
        Object.setPrototypeOf(this, MeiliSearchCommunicationError.prototype);
        this.name = 'MeiliSearchCommunicationError';
        if (body instanceof Response) {
            this.message = body.statusText;
            this.statusCode = body.status;
        }
        if (body instanceof Error) {
            this.errno = body.errno;
            this.code = body.code;
        }
        if (stack) {
            this.stack = stack;
            this.stack = (_a = this.stack) === null || _a === void 0 ? void 0 : _a.replace(/(TypeError|FetchError)/, this.name);
            this.stack = (_b = this.stack) === null || _b === void 0 ? void 0 : _b.replace('Failed to fetch', `request to ${url} failed, reason: connect ECONNREFUSED`);
            this.stack = (_c = this.stack) === null || _c === void 0 ? void 0 : _c.replace('Not Found', `Not Found: ${url}`);
        }
        else {
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, MeiliSearchCommunicationError);
            }
        }
    }
}

const MeiliSearchApiError = class extends Error {
    constructor(error, status) {
        super(error.message);
        // Make errors comparison possible. ex: error instanceof MeiliSearchApiError.
        Object.setPrototypeOf(this, MeiliSearchApiError.prototype);
        this.name = 'MeiliSearchApiError';
        this.code = error.code;
        this.type = error.type;
        this.link = error.link;
        this.message = error.message;
        this.httpStatus = status;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MeiliSearchApiError);
        }
    }
};

function httpResponseErrorHandler(response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!response.ok) {
            let responseBody;
            try {
                // If it is not possible to parse the return body it means there is none
                // In which case it is a communication error with the Meilisearch instance
                responseBody = yield response.json();
            }
            catch (e) {
                // Not sure on how to test this part of the code.
                throw new MeiliSearchCommunicationError(response.statusText, response, response.url);
            }
            // If the body is parsable, then it means Meilisearch returned a body with
            // information on the error.
            throw new MeiliSearchApiError(responseBody, response.status);
        }
        return response;
    });
}
function httpErrorHandler(response, stack, url) {
    if (response.name !== 'MeiliSearchApiError') {
        throw new MeiliSearchCommunicationError(response.message, response, url, stack);
    }
    throw response;
}

class MeiliSearchError extends Error {
    constructor(message) {
        super(message);
        // Make errors comparison possible. ex: error instanceof MeiliSearchError.
        Object.setPrototypeOf(this, MeiliSearchError.prototype);
        this.name = 'MeiliSearchError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MeiliSearchError);
        }
    }
}

class MeiliSearchTimeOutError extends Error {
    constructor(message) {
        super(message);
        // Make errors comparison possible. ex: error instanceof MeiliSearchTimeOutError.
        Object.setPrototypeOf(this, MeiliSearchTimeOutError.prototype);
        this.name = 'MeiliSearchTimeOutError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MeiliSearchTimeOutError);
        }
    }
}

function versionErrorHintMessage(message, method) {
    return `${message}\nHint: It might not be working because maybe you're not up to date with the Meilisearch version that ${method} call requires.`;
}

/** Removes undefined entries from object */
function removeUndefinedFromObject(obj) {
    return Object.entries(obj).reduce((acc, curEntry) => {
        const [key, val] = curEntry;
        if (val !== undefined)
            acc[key] = val;
        return acc;
    }, {});
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve) => setTimeout(resolve, ms));
    });
}
function addProtocolIfNotPresent(host) {
    if (!(host.startsWith('https://') || host.startsWith('http://'))) {
        return `http://${host}`;
    }
    return host;
}
function addTrailingSlash(url) {
    if (!url.endsWith('/')) {
        url += '/';
    }
    return url;
}
function validateUuid4(uuid) {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(uuid);
}

const PACKAGE_VERSION = '0.36.0';

function toQueryParams(parameters) {
    const params = Object.keys(parameters);
    const queryParams = params.reduce((acc, key) => {
        const value = parameters[key];
        if (value === undefined) {
            return acc;
        }
        else if (Array.isArray(value)) {
            return Object.assign(Object.assign({}, acc), { [key]: value.join(',') });
        }
        else if (value instanceof Date) {
            return Object.assign(Object.assign({}, acc), { [key]: value.toISOString() });
        }
        return Object.assign(Object.assign({}, acc), { [key]: value });
    }, {});
    return queryParams;
}
function constructHostURL(host) {
    try {
        host = addProtocolIfNotPresent(host);
        host = addTrailingSlash(host);
        return host;
    }
    catch (e) {
        throw new MeiliSearchError('The provided host is not valid.');
    }
}
function cloneAndParseHeaders(headers) {
    if (Array.isArray(headers)) {
        return headers.reduce((acc, headerPair) => {
            acc[headerPair[0]] = headerPair[1];
            return acc;
        }, {});
    }
    else if ('has' in headers) {
        const clonedHeaders = {};
        headers.forEach((value, key) => (clonedHeaders[key] = value));
        return clonedHeaders;
    }
    else {
        return Object.assign({}, headers);
    }
}
function createHeaders(config) {
    var _a, _b;
    const agentHeader = 'X-Meilisearch-Client';
    const packageAgent = `Meilisearch JavaScript (v${PACKAGE_VERSION})`;
    const contentType = 'Content-Type';
    const authorization = 'Authorization';
    const headers = cloneAndParseHeaders((_b = (_a = config.requestConfig) === null || _a === void 0 ? void 0 : _a.headers) !== null && _b !== void 0 ? _b : {});
    // do not override if user provided the header
    if (config.apiKey && !headers[authorization]) {
        headers[authorization] = `Bearer ${config.apiKey}`;
    }
    if (!headers[contentType]) {
        headers['Content-Type'] = 'application/json';
    }
    // Creates the custom user agent with information on the package used.
    if (config.clientAgents && Array.isArray(config.clientAgents)) {
        const clients = config.clientAgents.concat(packageAgent);
        headers[agentHeader] = clients.join(' ; ');
    }
    else if (config.clientAgents && !Array.isArray(config.clientAgents)) {
        // If the header is defined but not an array
        throw new MeiliSearchError(`Meilisearch: The header "${agentHeader}" should be an array of string(s).\n`);
    }
    else {
        headers[agentHeader] = packageAgent;
    }
    return headers;
}
class HttpRequests {
    constructor(config) {
        this.headers = createHeaders(config);
        this.requestConfig = config.requestConfig;
        this.httpClient = config.httpClient;
        this.requestTimeout = config.timeout;
        try {
            const host = constructHostURL(config.host);
            this.url = new URL(host);
        }
        catch (e) {
            throw new MeiliSearchError('The provided host is not valid.');
        }
    }
    request({ method, url, params, body, config = {}, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof fetch === 'undefined') {
                require('cross-fetch/polyfill');
            }
            const constructURL = new URL(url, this.url);
            if (params) {
                const queryParams = new URLSearchParams();
                Object.keys(params)
                    .filter((x) => params[x] !== null)
                    .map((x) => queryParams.set(x, params[x]));
                constructURL.search = queryParams.toString();
            }
            // in case a custom content-type is provided
            // do not stringify body
            if (!((_a = config.headers) === null || _a === void 0 ? void 0 : _a['Content-Type'])) {
                body = JSON.stringify(body);
            }
            const headers = Object.assign(Object.assign({}, this.headers), config.headers);
            try {
                const result = this.fetchWithTimeout(constructURL.toString(), Object.assign(Object.assign(Object.assign({}, config), this.requestConfig), { method,
                    body,
                    headers }), this.requestTimeout);
                // When using a custom HTTP client, the response is returned to allow the user to parse/handle it as they see fit
                if (this.httpClient) {
                    return yield result;
                }
                const response = yield result.then((res) => httpResponseErrorHandler(res));
                const parsedBody = yield response.json().catch(() => undefined);
                return parsedBody;
            }
            catch (e) {
                const stack = e.stack;
                httpErrorHandler(e, stack, constructURL.toString());
            }
        });
    }
    fetchWithTimeout(url, options, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const fetchFn = this.httpClient ? this.httpClient : fetch;
                const fetchPromise = fetchFn(url, options);
                const promises = [fetchPromise];
                // TimeoutPromise will not run if undefined or zero
                let timeoutId;
                if (timeout) {
                    const timeoutPromise = new Promise((_, reject) => {
                        timeoutId = setTimeout(() => {
                            reject(new Error('Error: Request Timed Out'));
                        }, timeout);
                    });
                    promises.push(timeoutPromise);
                }
                Promise.race(promises)
                    .then(resolve)
                    .catch(reject)
                    .finally(() => {
                    clearTimeout(timeoutId);
                });
            });
        });
    }
    get(url, params, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request({
                method: 'GET',
                url,
                params,
                config,
            });
        });
    }
    post(url, data, params, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request({
                method: 'POST',
                url,
                body: data,
                params,
                config,
            });
        });
    }
    put(url, data, params, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request({
                method: 'PUT',
                url,
                body: data,
                params,
                config,
            });
        });
    }
    patch(url, data, params, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request({
                method: 'PATCH',
                url,
                body: data,
                params,
                config,
            });
        });
    }
    delete(url, data, params, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request({
                method: 'DELETE',
                url,
                body: data,
                params,
                config,
            });
        });
    }
}

class EnqueuedTask {
    constructor(task) {
        this.taskUid = task.taskUid;
        this.indexUid = task.indexUid;
        this.status = task.status;
        this.type = task.type;
        this.enqueuedAt = new Date(task.enqueuedAt);
    }
}

class Task {
    constructor(task) {
        this.indexUid = task.indexUid;
        this.status = task.status;
        this.type = task.type;
        this.uid = task.uid;
        this.details = task.details;
        this.canceledBy = task.canceledBy;
        this.error = task.error;
        this.duration = task.duration;
        this.startedAt = new Date(task.startedAt);
        this.enqueuedAt = new Date(task.enqueuedAt);
        this.finishedAt = new Date(task.finishedAt);
    }
}
class TaskClient {
    constructor(config) {
        this.httpRequest = new HttpRequests(config);
    }
    /**
     * Get one task
     *
     * @param uid - Unique identifier of the task
     * @returns
     */
    getTask(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `tasks/${uid}`;
            const taskItem = yield this.httpRequest.get(url);
            return new Task(taskItem);
        });
    }
    /**
     * Get tasks
     *
     * @param parameters - Parameters to browse the tasks
     * @returns Promise containing all tasks
     */
    getTasks(parameters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `tasks`;
            const tasks = yield this.httpRequest.get(url, toQueryParams(parameters));
            return Object.assign(Object.assign({}, tasks), { results: tasks.results.map((task) => new Task(task)) });
        });
    }
    /**
     * Wait for a task to be processed.
     *
     * @param taskUid - Task identifier
     * @param options - Additional configuration options
     * @returns Promise returning a task after it has been processed
     */
    waitForTask(taskUid, { timeOutMs = 5000, intervalMs = 50 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const startingTime = Date.now();
            while (Date.now() - startingTime < timeOutMs) {
                const response = yield this.getTask(taskUid);
                if (![
                    TaskStatus.TASK_ENQUEUED,
                    TaskStatus.TASK_PROCESSING,
                ].includes(response.status))
                    return response;
                yield sleep(intervalMs);
            }
            throw new MeiliSearchTimeOutError(`timeout of ${timeOutMs}ms has exceeded on process ${taskUid} when waiting a task to be resolved.`);
        });
    }
    /**
     * Waits for multiple tasks to be processed
     *
     * @param taskUids - Tasks identifier list
     * @param options - Wait options
     * @returns Promise returning a list of tasks after they have been processed
     */
    waitForTasks(taskUids, { timeOutMs = 5000, intervalMs = 50 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = [];
            for (const taskUid of taskUids) {
                const task = yield this.waitForTask(taskUid, {
                    timeOutMs,
                    intervalMs,
                });
                tasks.push(task);
            }
            return tasks;
        });
    }
    /**
     * Cancel a list of enqueued or processing tasks.
     *
     * @param parameters - Parameters to filter the tasks.
     * @returns Promise containing an EnqueuedTask
     */
    cancelTasks(parameters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `tasks/cancel`;
            const task = yield this.httpRequest.post(url, {}, toQueryParams(parameters));
            return new EnqueuedTask(task);
        });
    }
    /**
     * Delete a list tasks.
     *
     * @param parameters - Parameters to filter the tasks.
     * @returns Promise containing an EnqueuedTask
     */
    deleteTasks(parameters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `tasks`;
            const task = yield this.httpRequest.delete(url, {}, toQueryParams(parameters));
            return new EnqueuedTask(task);
        });
    }
}

/*
 * Bundle: MeiliSearch / Indexes
 * Project: MeiliSearch - Javascript API
 * Author: Quentin de Quelen <quentin@meilisearch.com>
 * Copyright: 2019, MeiliSearch
 */
class Index {
    /**
     * @param config - Request configuration options
     * @param uid - UID of the index
     * @param primaryKey - Primary Key of the index
     */
    constructor(config, uid, primaryKey) {
        this.uid = uid;
        this.primaryKey = primaryKey;
        this.httpRequest = new HttpRequests(config);
        this.tasks = new TaskClient(config);
    }
    ///
    /// SEARCH
    ///
    /**
     * Search for documents into an index
     *
     * @param query - Query string
     * @param options - Search options
     * @param config - Additional request configuration options
     * @returns Promise containing the search response
     */
    search(query, options, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/search`;
            return yield this.httpRequest.post(url, removeUndefinedFromObject(Object.assign({ q: query }, options)), undefined, config);
        });
    }
    /**
     * Search for documents into an index using the GET method
     *
     * @param query - Query string
     * @param options - Search options
     * @param config - Additional request configuration options
     * @returns Promise containing the search response
     */
    searchGet(query, options, config) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/search`;
            const parseFilter = (filter) => {
                if (typeof filter === 'string')
                    return filter;
                else if (Array.isArray(filter))
                    throw new MeiliSearchError('The filter query parameter should be in string format when using searchGet');
                else
                    return undefined;
            };
            const getParams = Object.assign(Object.assign({ q: query }, options), { filter: parseFilter(options === null || options === void 0 ? void 0 : options.filter), sort: (_a = options === null || options === void 0 ? void 0 : options.sort) === null || _a === void 0 ? void 0 : _a.join(','), facets: (_b = options === null || options === void 0 ? void 0 : options.facets) === null || _b === void 0 ? void 0 : _b.join(','), attributesToRetrieve: (_c = options === null || options === void 0 ? void 0 : options.attributesToRetrieve) === null || _c === void 0 ? void 0 : _c.join(','), attributesToCrop: (_d = options === null || options === void 0 ? void 0 : options.attributesToCrop) === null || _d === void 0 ? void 0 : _d.join(','), attributesToHighlight: (_e = options === null || options === void 0 ? void 0 : options.attributesToHighlight) === null || _e === void 0 ? void 0 : _e.join(','), vector: (_f = options === null || options === void 0 ? void 0 : options.vector) === null || _f === void 0 ? void 0 : _f.join(','), attributesToSearchOn: (_g = options === null || options === void 0 ? void 0 : options.attributesToSearchOn) === null || _g === void 0 ? void 0 : _g.join(',') });
            return yield this.httpRequest.get(url, removeUndefinedFromObject(getParams), config);
        });
    }
    /**
     * Search for facet values
     *
     * @param params - Parameters used to search on the facets
     * @param config - Additional request configuration options
     * @returns Promise containing the search response
     */
    searchForFacetValues(params, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/facet-search`;
            return yield this.httpRequest.post(url, removeUndefinedFromObject(params), undefined, config);
        });
    }
    ///
    /// INDEX
    ///
    /**
     * Get index information.
     *
     * @returns Promise containing index information
     */
    getRawInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}`;
            const res = yield this.httpRequest.get(url);
            this.primaryKey = res.primaryKey;
            this.updatedAt = new Date(res.updatedAt);
            this.createdAt = new Date(res.createdAt);
            return res;
        });
    }
    /**
     * Fetch and update Index information.
     *
     * @returns Promise to the current Index object with updated information
     */
    fetchInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getRawInfo();
            return this;
        });
    }
    /**
     * Get Primary Key.
     *
     * @returns Promise containing the Primary Key of the index
     */
    fetchPrimaryKey() {
        return __awaiter(this, void 0, void 0, function* () {
            this.primaryKey = (yield this.getRawInfo()).primaryKey;
            return this.primaryKey;
        });
    }
    /**
     * Create an index.
     *
     * @param uid - Unique identifier of the Index
     * @param options - Index options
     * @param config - Request configuration options
     * @returns Newly created Index object
     */
    static create(uid, options = {}, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes`;
            const req = new HttpRequests(config);
            const task = yield req.post(url, Object.assign(Object.assign({}, options), { uid }));
            return new EnqueuedTask(task);
        });
    }
    /**
     * Update an index.
     *
     * @param data - Data to update
     * @returns Promise to the current Index object with updated information
     */
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}`;
            const task = yield this.httpRequest.patch(url, data);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    /**
     * Delete an index.
     *
     * @returns Promise which resolves when index is deleted successfully
     */
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}`;
            const task = yield this.httpRequest.delete(url);
            return new EnqueuedTask(task);
        });
    }
    ///
    /// TASKS
    ///
    /**
     * Get the list of all the tasks of the index.
     *
     * @param parameters - Parameters to browse the tasks
     * @returns Promise containing all tasks
     */
    getTasks(parameters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tasks.getTasks(Object.assign(Object.assign({}, parameters), { indexUids: [this.uid] }));
        });
    }
    /**
     * Get one task of the index.
     *
     * @param taskUid - Task identifier
     * @returns Promise containing a task
     */
    getTask(taskUid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tasks.getTask(taskUid);
        });
    }
    /**
     * Wait for multiple tasks to be processed.
     *
     * @param taskUids - Tasks identifier
     * @param waitOptions - Options on timeout and interval
     * @returns Promise containing an array of tasks
     */
    waitForTasks(taskUids, { timeOutMs = 5000, intervalMs = 50 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tasks.waitForTasks(taskUids, {
                timeOutMs,
                intervalMs,
            });
        });
    }
    /**
     * Wait for a task to be processed.
     *
     * @param taskUid - Task identifier
     * @param waitOptions - Options on timeout and interval
     * @returns Promise containing an array of tasks
     */
    waitForTask(taskUid, { timeOutMs = 5000, intervalMs = 50 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tasks.waitForTask(taskUid, {
                timeOutMs,
                intervalMs,
            });
        });
    }
    ///
    /// STATS
    ///
    /**
     * Get stats of an index
     *
     * @returns Promise containing object with stats of the index
     */
    getStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/stats`;
            return yield this.httpRequest.get(url);
        });
    }
    ///
    /// DOCUMENTS
    ///
    /**
     * Get documents of an index.
     *
     * @param parameters - Parameters to browse the documents. Parameters can
     *   contain the `filter` field only available in Meilisearch v1.2 and newer
     * @returns Promise containing the returned documents
     */
    getDocuments(parameters = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            parameters = removeUndefinedFromObject(parameters);
            // In case `filter` is provided, use `POST /documents/fetch`
            if (parameters.filter !== undefined) {
                try {
                    const url = `indexes/${this.uid}/documents/fetch`;
                    return yield this.httpRequest.post(url, parameters);
                }
                catch (e) {
                    if (e instanceof MeiliSearchCommunicationError) {
                        e.message = versionErrorHintMessage(e.message, 'getDocuments');
                    }
                    else if (e instanceof MeiliSearchApiError) {
                        e.message = versionErrorHintMessage(e.message, 'getDocuments');
                    }
                    throw e;
                }
                // Else use `GET /documents` method
            }
            else {
                const url = `indexes/${this.uid}/documents`;
                // Transform fields to query parameter string format
                const fields = Array.isArray(parameters === null || parameters === void 0 ? void 0 : parameters.fields)
                    ? { fields: (_a = parameters === null || parameters === void 0 ? void 0 : parameters.fields) === null || _a === void 0 ? void 0 : _a.join(',') }
                    : {};
                return yield this.httpRequest.get(url, Object.assign(Object.assign({}, parameters), fields));
            }
        });
    }
    /**
     * Get one document
     *
     * @param documentId - Document ID
     * @param parameters - Parameters applied on a document
     * @returns Promise containing Document response
     */
    getDocument(documentId, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/documents/${documentId}`;
            const fields = (() => {
                var _a;
                if (Array.isArray(parameters === null || parameters === void 0 ? void 0 : parameters.fields)) {
                    return (_a = parameters === null || parameters === void 0 ? void 0 : parameters.fields) === null || _a === void 0 ? void 0 : _a.join(',');
                }
                return undefined;
            })();
            return yield this.httpRequest.get(url, removeUndefinedFromObject(Object.assign(Object.assign({}, parameters), { fields })));
        });
    }
    /**
     * Add or replace multiples documents to an index
     *
     * @param documents - Array of Document objects to add/replace
     * @param options - Options on document addition
     * @returns Promise containing an EnqueuedTask
     */
    addDocuments(documents, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/documents`;
            const task = yield this.httpRequest.post(url, documents, options);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Add or replace multiples documents in a string format to an index. It only
     * supports csv, ndjson and json formats.
     *
     * @param documents - Documents provided in a string to add/replace
     * @param contentType - Content type of your document:
     *   'text/csv'|'application/x-ndjson'|'application/json'
     * @param options - Options on document addition
     * @returns Promise containing an EnqueuedTask
     */
    addDocumentsFromString(documents, contentType, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/documents`;
            const task = yield this.httpRequest.post(url, documents, queryParams, {
                headers: {
                    'Content-Type': contentType,
                },
            });
            return new EnqueuedTask(task);
        });
    }
    /**
     * Add or replace multiples documents to an index in batches
     *
     * @param documents - Array of Document objects to add/replace
     * @param batchSize - Size of the batch
     * @param options - Options on document addition
     * @returns Promise containing array of enqueued task objects for each batch
     */
    addDocumentsInBatches(documents, batchSize = 1000, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = [];
            for (let i = 0; i < documents.length; i += batchSize) {
                updates.push(yield this.addDocuments(documents.slice(i, i + batchSize), options));
            }
            return updates;
        });
    }
    /**
     * Add or update multiples documents to an index
     *
     * @param documents - Array of Document objects to add/update
     * @param options - Options on document update
     * @returns Promise containing an EnqueuedTask
     */
    updateDocuments(documents, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/documents`;
            const task = yield this.httpRequest.put(url, documents, options);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Add or update multiples documents to an index in batches
     *
     * @param documents - Array of Document objects to add/update
     * @param batchSize - Size of the batch
     * @param options - Options on document update
     * @returns Promise containing array of enqueued task objects for each batch
     */
    updateDocumentsInBatches(documents, batchSize = 1000, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = [];
            for (let i = 0; i < documents.length; i += batchSize) {
                updates.push(yield this.updateDocuments(documents.slice(i, i + batchSize), options));
            }
            return updates;
        });
    }
    /**
     * Add or update multiples documents in a string format to an index. It only
     * supports csv, ndjson and json formats.
     *
     * @param documents - Documents provided in a string to add/update
     * @param contentType - Content type of your document:
     *   'text/csv'|'application/x-ndjson'|'application/json'
     * @param queryParams - Options on raw document addition
     * @returns Promise containing an EnqueuedTask
     */
    updateDocumentsFromString(documents, contentType, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/documents`;
            const task = yield this.httpRequest.put(url, documents, queryParams, {
                headers: {
                    'Content-Type': contentType,
                },
            });
            return new EnqueuedTask(task);
        });
    }
    /**
     * Delete one document
     *
     * @param documentId - Id of Document to delete
     * @returns Promise containing an EnqueuedTask
     */
    deleteDocument(documentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/documents/${documentId}`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    /**
     * Delete multiples documents of an index.
     *
     * @param params - Params value can be:
     *
     *   - DocumentsDeletionQuery: An object containing the parameters to customize
     *       your document deletion. Only available in Meilisearch v1.2 and newer
     *   - DocumentsIds: An array of document ids to delete
     *
     * @returns Promise containing an EnqueuedTask
     */
    deleteDocuments(params) {
        return __awaiter(this, void 0, void 0, function* () {
            // If params is of type DocumentsDeletionQuery
            const isDocumentsDeletionQuery = !Array.isArray(params) && typeof params === 'object';
            const endpoint = isDocumentsDeletionQuery
                ? 'documents/delete'
                : 'documents/delete-batch';
            const url = `indexes/${this.uid}/${endpoint}`;
            try {
                const task = yield this.httpRequest.post(url, params);
                return new EnqueuedTask(task);
            }
            catch (e) {
                if (e instanceof MeiliSearchCommunicationError &&
                    isDocumentsDeletionQuery) {
                    e.message = versionErrorHintMessage(e.message, 'deleteDocuments');
                }
                else if (e instanceof MeiliSearchApiError) {
                    e.message = versionErrorHintMessage(e.message, 'deleteDocuments');
                }
                throw e;
            }
        });
    }
    /**
     * Delete all documents of an index
     *
     * @returns Promise containing an EnqueuedTask
     */
    deleteAllDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/documents`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// SETTINGS
    ///
    /**
     * Retrieve all settings
     *
     * @returns Promise containing Settings object
     */
    getSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update all settings Any parameters not provided will be left unchanged.
     *
     * @param settings - Object containing parameters with their updated values
     * @returns Promise containing an EnqueuedTask
     */
    updateSettings(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings`;
            const task = yield this.httpRequest.patch(url, settings);
            task.enqueued = new Date(task.enqueuedAt);
            return task;
        });
    }
    /**
     * Reset settings.
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// PAGINATION SETTINGS
    ///
    /**
     * Get the pagination settings.
     *
     * @returns Promise containing object of pagination settings
     */
    getPagination() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/pagination`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the pagination settings.
     *
     * @param pagination - Pagination object
     * @returns Promise containing an EnqueuedTask
     */
    updatePagination(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/pagination`;
            const task = yield this.httpRequest.patch(url, pagination);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the pagination settings.
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetPagination() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/pagination`;
            const task = yield this.httpRequest.delete(url);
            return new EnqueuedTask(task);
        });
    }
    ///
    /// SYNONYMS
    ///
    /**
     * Get the list of all synonyms
     *
     * @returns Promise containing object of synonym mappings
     */
    getSynonyms() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/synonyms`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the list of synonyms. Overwrite the old list.
     *
     * @param synonyms - Mapping of synonyms with their associated words
     * @returns Promise containing an EnqueuedTask
     */
    updateSynonyms(synonyms) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/synonyms`;
            const task = yield this.httpRequest.put(url, synonyms);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the synonym list to be empty again
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetSynonyms() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/synonyms`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// STOP WORDS
    ///
    /**
     * Get the list of all stop-words
     *
     * @returns Promise containing array of stop-words
     */
    getStopWords() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/stop-words`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the list of stop-words. Overwrite the old list.
     *
     * @param stopWords - Array of strings that contains the stop-words.
     * @returns Promise containing an EnqueuedTask
     */
    updateStopWords(stopWords) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/stop-words`;
            const task = yield this.httpRequest.put(url, stopWords);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the stop-words list to be empty again
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetStopWords() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/stop-words`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// RANKING RULES
    ///
    /**
     * Get the list of all ranking-rules
     *
     * @returns Promise containing array of ranking-rules
     */
    getRankingRules() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/ranking-rules`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the list of ranking-rules. Overwrite the old list.
     *
     * @param rankingRules - Array that contain ranking rules sorted by order of
     *   importance.
     * @returns Promise containing an EnqueuedTask
     */
    updateRankingRules(rankingRules) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/ranking-rules`;
            const task = yield this.httpRequest.put(url, rankingRules);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the ranking rules list to its default value
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetRankingRules() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/ranking-rules`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// DISTINCT ATTRIBUTE
    ///
    /**
     * Get the distinct-attribute
     *
     * @returns Promise containing the distinct-attribute of the index
     */
    getDistinctAttribute() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/distinct-attribute`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the distinct-attribute.
     *
     * @param distinctAttribute - Field name of the distinct-attribute
     * @returns Promise containing an EnqueuedTask
     */
    updateDistinctAttribute(distinctAttribute) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/distinct-attribute`;
            const task = yield this.httpRequest.put(url, distinctAttribute);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the distinct-attribute.
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetDistinctAttribute() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/distinct-attribute`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// FILTERABLE ATTRIBUTES
    ///
    /**
     * Get the filterable-attributes
     *
     * @returns Promise containing an array of filterable-attributes
     */
    getFilterableAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/filterable-attributes`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the filterable-attributes.
     *
     * @param filterableAttributes - Array of strings containing the attributes
     *   that can be used as filters at query time
     * @returns Promise containing an EnqueuedTask
     */
    updateFilterableAttributes(filterableAttributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/filterable-attributes`;
            const task = yield this.httpRequest.put(url, filterableAttributes);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the filterable-attributes.
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetFilterableAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/filterable-attributes`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// SORTABLE ATTRIBUTES
    ///
    /**
     * Get the sortable-attributes
     *
     * @returns Promise containing array of sortable-attributes
     */
    getSortableAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/sortable-attributes`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the sortable-attributes.
     *
     * @param sortableAttributes - Array of strings containing the attributes that
     *   can be used to sort search results at query time
     * @returns Promise containing an EnqueuedTask
     */
    updateSortableAttributes(sortableAttributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/sortable-attributes`;
            const task = yield this.httpRequest.put(url, sortableAttributes);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the sortable-attributes.
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetSortableAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/sortable-attributes`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// SEARCHABLE ATTRIBUTE
    ///
    /**
     * Get the searchable-attributes
     *
     * @returns Promise containing array of searchable-attributes
     */
    getSearchableAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/searchable-attributes`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the searchable-attributes.
     *
     * @param searchableAttributes - Array of strings that contains searchable
     *   attributes sorted by order of importance(most to least important)
     * @returns Promise containing an EnqueuedTask
     */
    updateSearchableAttributes(searchableAttributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/searchable-attributes`;
            const task = yield this.httpRequest.put(url, searchableAttributes);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the searchable-attributes.
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetSearchableAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/searchable-attributes`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// DISPLAYED ATTRIBUTE
    ///
    /**
     * Get the displayed-attributes
     *
     * @returns Promise containing array of displayed-attributes
     */
    getDisplayedAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/displayed-attributes`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the displayed-attributes.
     *
     * @param displayedAttributes - Array of strings that contains attributes of
     *   an index to display
     * @returns Promise containing an EnqueuedTask
     */
    updateDisplayedAttributes(displayedAttributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/displayed-attributes`;
            const task = yield this.httpRequest.put(url, displayedAttributes);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the displayed-attributes.
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetDisplayedAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/displayed-attributes`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// TYPO TOLERANCE
    ///
    /**
     * Get the typo tolerance settings.
     *
     * @returns Promise containing the typo tolerance settings.
     */
    getTypoTolerance() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/typo-tolerance`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the typo tolerance settings.
     *
     * @param typoTolerance - Object containing the custom typo tolerance
     *   settings.
     * @returns Promise containing object of the enqueued update
     */
    updateTypoTolerance(typoTolerance) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/typo-tolerance`;
            const task = yield this.httpRequest.patch(url, typoTolerance);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    /**
     * Reset the typo tolerance settings.
     *
     * @returns Promise containing object of the enqueued update
     */
    resetTypoTolerance() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/typo-tolerance`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// FACETING
    ///
    /**
     * Get the faceting settings.
     *
     * @returns Promise containing object of faceting index settings
     */
    getFaceting() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/faceting`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the faceting settings.
     *
     * @param faceting - Faceting index settings object
     * @returns Promise containing an EnqueuedTask
     */
    updateFaceting(faceting) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/faceting`;
            const task = yield this.httpRequest.patch(url, faceting);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the faceting settings.
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetFaceting() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/faceting`;
            const task = yield this.httpRequest.delete(url);
            return new EnqueuedTask(task);
        });
    }
    ///
    /// SEPARATOR TOKENS
    ///
    /**
     * Get the list of all separator tokens.
     *
     * @returns Promise containing array of separator tokens
     */
    getSeparatorTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/separator-tokens`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the list of separator tokens. Overwrite the old list.
     *
     * @param separatorTokens - Array that contains separator tokens.
     * @returns Promise containing an EnqueuedTask or null
     */
    updateSeparatorTokens(separatorTokens) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/separator-tokens`;
            const task = yield this.httpRequest.put(url, separatorTokens);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the separator tokens list to its default value
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetSeparatorTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/separator-tokens`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// NON-SEPARATOR TOKENS
    ///
    /**
     * Get the list of all non-separator tokens.
     *
     * @returns Promise containing array of non-separator tokens
     */
    getNonSeparatorTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/non-separator-tokens`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the list of non-separator tokens. Overwrite the old list.
     *
     * @param nonSeparatorTokens - Array that contains non-separator tokens.
     * @returns Promise containing an EnqueuedTask or null
     */
    updateNonSeparatorTokens(nonSeparatorTokens) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/non-separator-tokens`;
            const task = yield this.httpRequest.put(url, nonSeparatorTokens);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the non-separator tokens list to its default value
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetNonSeparatorTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/non-separator-tokens`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
    ///
    /// DICTIONARY
    ///
    /**
     * Get the dictionary settings of a Meilisearch index.
     *
     * @returns Promise containing the dictionary settings
     */
    getDictionary() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/dictionary`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Update the the dictionary settings. Overwrite the old settings.
     *
     * @param dictionary - Array that contains the new dictionary settings.
     * @returns Promise containing an EnqueuedTask or null
     */
    updateDictionary(dictionary) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/dictionary`;
            const task = yield this.httpRequest.put(url, dictionary);
            return new EnqueuedTask(task);
        });
    }
    /**
     * Reset the dictionary settings to its default value
     *
     * @returns Promise containing an EnqueuedTask
     */
    resetDictionary() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes/${this.uid}/settings/dictionary`;
            const task = yield this.httpRequest.delete(url);
            task.enqueuedAt = new Date(task.enqueuedAt);
            return task;
        });
    }
}

/*
 * Bundle: MeiliSearch
 * Project: MeiliSearch - Javascript API
 * Author: Quentin de Quelen <quentin@meilisearch.com>
 * Copyright: 2019, MeiliSearch
 */
class Client {
    /**
     * Creates new MeiliSearch instance
     *
     * @param config - Configuration object
     */
    constructor(config) {
        this.config = config;
        this.httpRequest = new HttpRequests(config);
        this.tasks = new TaskClient(config);
    }
    /**
     * Return an Index instance
     *
     * @param indexUid - The index UID
     * @returns Instance of Index
     */
    index(indexUid) {
        return new Index(this.config, indexUid);
    }
    /**
     * Gather information about an index by calling MeiliSearch and return an
     * Index instance with the gathered information
     *
     * @param indexUid - The index UID
     * @returns Promise returning Index instance
     */
    getIndex(indexUid) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Index(this.config, indexUid).fetchInfo();
        });
    }
    /**
     * Gather information about an index by calling MeiliSearch and return the raw
     * JSON response
     *
     * @param indexUid - The index UID
     * @returns Promise returning index information
     */
    getRawIndex(indexUid) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Index(this.config, indexUid).getRawInfo();
        });
    }
    /**
     * Get all the indexes as Index instances.
     *
     * @param parameters - Parameters to browse the indexes
     * @returns Promise returning array of raw index information
     */
    getIndexes(parameters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawIndexes = yield this.getRawIndexes(parameters);
            const indexes = rawIndexes.results.map((index) => new Index(this.config, index.uid, index.primaryKey));
            return Object.assign(Object.assign({}, rawIndexes), { results: indexes });
        });
    }
    /**
     * Get all the indexes in their raw value (no Index instances).
     *
     * @param parameters - Parameters to browse the indexes
     * @returns Promise returning array of raw index information
     */
    getRawIndexes(parameters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `indexes`;
            return yield this.httpRequest.get(url, parameters);
        });
    }
    /**
     * Create a new index
     *
     * @param uid - The index UID
     * @param options - Index options
     * @returns Promise returning Index instance
     */
    createIndex(uid, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Index.create(uid, options, this.config);
        });
    }
    /**
     * Update an index
     *
     * @param uid - The index UID
     * @param options - Index options to update
     * @returns Promise returning Index instance after updating
     */
    updateIndex(uid, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Index(this.config, uid).update(options);
        });
    }
    /**
     * Delete an index
     *
     * @param uid - The index UID
     * @returns Promise which resolves when index is deleted successfully
     */
    deleteIndex(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Index(this.config, uid).delete();
        });
    }
    /**
     * Deletes an index if it already exists.
     *
     * @param uid - The index UID
     * @returns Promise which resolves to true when index exists and is deleted
     *   successfully, otherwise false if it does not exist
     */
    deleteIndexIfExists(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.deleteIndex(uid);
                return true;
            }
            catch (e) {
                if (e.code === ErrorStatusCode.INDEX_NOT_FOUND) {
                    return false;
                }
                throw e;
            }
        });
    }
    /**
     * Swaps a list of index tuples.
     *
     * @param params - List of indexes tuples to swap.
     * @returns Promise returning object of the enqueued task
     */
    swapIndexes(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = '/swap-indexes';
            return yield this.httpRequest.post(url, params);
        });
    }
    ///
    /// Multi Search
    ///
    /**
     * Perform multiple search queries.
     *
     * It is possible to make multiple search queries on the same index or on
     * different ones
     *
     * @example
     *
     * ```ts
     * client.multiSearch({
     *   queries: [
     *     { indexUid: 'movies', q: 'wonder' },
     *     { indexUid: 'books', q: 'flower' },
     *   ],
     * })
     * ```
     *
     * @param queries - Search queries
     * @param config - Additional request configuration options
     * @returns Promise containing the search responses
     */
    multiSearch(queries, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `multi-search`;
            return yield this.httpRequest.post(url, queries, undefined, config);
        });
    }
    ///
    /// TASKS
    ///
    /**
     * Get the list of all client tasks
     *
     * @param parameters - Parameters to browse the tasks
     * @returns Promise returning all tasks
     */
    getTasks(parameters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tasks.getTasks(parameters);
        });
    }
    /**
     * Get one task on the client scope
     *
     * @param taskUid - Task identifier
     * @returns Promise returning a task
     */
    getTask(taskUid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tasks.getTask(taskUid);
        });
    }
    /**
     * Wait for multiple tasks to be finished.
     *
     * @param taskUids - Tasks identifier
     * @param waitOptions - Options on timeout and interval
     * @returns Promise returning an array of tasks
     */
    waitForTasks(taskUids, { timeOutMs = 5000, intervalMs = 50 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tasks.waitForTasks(taskUids, {
                timeOutMs,
                intervalMs,
            });
        });
    }
    /**
     * Wait for a task to be finished.
     *
     * @param taskUid - Task identifier
     * @param waitOptions - Options on timeout and interval
     * @returns Promise returning an array of tasks
     */
    waitForTask(taskUid, { timeOutMs = 5000, intervalMs = 50 } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tasks.waitForTask(taskUid, {
                timeOutMs,
                intervalMs,
            });
        });
    }
    /**
     * Cancel a list of enqueued or processing tasks.
     *
     * @param parameters - Parameters to filter the tasks.
     * @returns Promise containing an EnqueuedTask
     */
    cancelTasks(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tasks.cancelTasks(parameters);
        });
    }
    /**
     * Delete a list of tasks.
     *
     * @param parameters - Parameters to filter the tasks.
     * @returns Promise containing an EnqueuedTask
     */
    deleteTasks(parameters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tasks.deleteTasks(parameters);
        });
    }
    ///
    /// KEYS
    ///
    /**
     * Get all API keys
     *
     * @param parameters - Parameters to browse the indexes
     * @returns Promise returning an object with keys
     */
    getKeys(parameters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `keys`;
            const keys = yield this.httpRequest.get(url, parameters);
            keys.results = keys.results.map((key) => (Object.assign(Object.assign({}, key), { createdAt: new Date(key.createdAt), updatedAt: new Date(key.updatedAt) })));
            return keys;
        });
    }
    /**
     * Get one API key
     *
     * @param keyOrUid - Key or uid of the API key
     * @returns Promise returning a key
     */
    getKey(keyOrUid) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `keys/${keyOrUid}`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Create one API key
     *
     * @param options - Key options
     * @returns Promise returning a key
     */
    createKey(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `keys`;
            return yield this.httpRequest.post(url, options);
        });
    }
    /**
     * Update one API key
     *
     * @param keyOrUid - Key
     * @param options - Key options
     * @returns Promise returning a key
     */
    updateKey(keyOrUid, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `keys/${keyOrUid}`;
            return yield this.httpRequest.patch(url, options);
        });
    }
    /**
     * Delete one API key
     *
     * @param keyOrUid - Key
     * @returns
     */
    deleteKey(keyOrUid) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `keys/${keyOrUid}`;
            return yield this.httpRequest.delete(url);
        });
    }
    ///
    /// HEALTH
    ///
    /**
     * Checks if the server is healthy, otherwise an error will be thrown.
     *
     * @returns Promise returning an object with health details
     */
    health() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `health`;
            return yield this.httpRequest.get(url);
        });
    }
    /**
     * Checks if the server is healthy, return true or false.
     *
     * @returns Promise returning a boolean
     */
    isHealthy() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `health`;
                yield this.httpRequest.get(url);
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
    ///
    /// STATS
    ///
    /**
     * Get the stats of all the database
     *
     * @returns Promise returning object of all the stats
     */
    getStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `stats`;
            return yield this.httpRequest.get(url);
        });
    }
    ///
    /// VERSION
    ///
    /**
     * Get the version of MeiliSearch
     *
     * @returns Promise returning object with version details
     */
    getVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `version`;
            return yield this.httpRequest.get(url);
        });
    }
    ///
    /// DUMPS
    ///
    /**
     * Creates a dump
     *
     * @returns Promise returning object of the enqueued task
     */
    createDump() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `dumps`;
            const task = yield this.httpRequest.post(url);
            return new EnqueuedTask(task);
        });
    }
    ///
    /// SNAPSHOTS
    ///
    /**
     * Creates a snapshot
     *
     * @returns Promise returning object of the enqueued task
     */
    createSnapshot() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `snapshots`;
            const task = yield this.httpRequest.post(url);
            return new EnqueuedTask(task);
        });
    }
    ///
    /// TOKENS
    ///
    /**
     * Generate a tenant token
     *
     * @param apiKeyUid - The uid of the api key used as issuer of the token.
     * @param searchRules - Search rules that are applied to every search.
     * @param options - Token options to customize some aspect of the token.
     * @returns The token in JWT format.
     */
    generateTenantToken(_apiKeyUid, _searchRules, _options) {
        const error = new Error();
        throw new Error(`Meilisearch: failed to generate a tenant token. Generation of a token only works in a node environment \n ${error.stack}.`);
    }
}

function encode64(data) {
    return Buffer.from(JSON.stringify(data)).toString('base64');
}
/**
 * Create the header of the token.
 *
 * @param apiKey - API key used to sign the token.
 * @param encodedHeader - Header of the token in base64.
 * @param encodedPayload - Payload of the token in base64.
 * @returns The signature of the token in base64.
 */
function sign(apiKey, encodedHeader, encodedPayload) {
    return crypto
        .createHmac('sha256', apiKey)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
/**
 * Create the header of the token.
 *
 * @returns The header encoded in base64.
 */
function createHeader() {
    const header = {
        alg: 'HS256',
        typ: 'JWT',
    };
    return encode64(header).replace(/=/g, '');
}
/**
 * Validate the parameter used for the payload of the token.
 *
 * @param searchRules - Search rules that are applied to every search.
 * @param apiKey - Api key used as issuer of the token.
 * @param uid - The uid of the api key used as issuer of the token.
 * @param expiresAt - Date at which the token expires.
 */
function validateTokenParameters(tokenParams) {
    const { searchRules, uid, apiKey, expiresAt } = tokenParams;
    if (expiresAt) {
        if (!(expiresAt instanceof Date)) {
            throw new MeiliSearchError(`Meilisearch: The expiredAt field must be an instance of Date.`);
        }
        else if (expiresAt.getTime() < Date.now()) {
            throw new MeiliSearchError(`Meilisearch: The expiresAt field must be a date in the future.`);
        }
    }
    if (searchRules) {
        if (!(typeof searchRules === 'object' || Array.isArray(searchRules))) {
            throw new MeiliSearchError(`Meilisearch: The search rules added in the token generation must be of type array or object.`);
        }
    }
    if (!apiKey || typeof apiKey !== 'string') {
        throw new MeiliSearchError(`Meilisearch: The API key used for the token generation must exist and be of type string.`);
    }
    if (!uid || typeof uid !== 'string') {
        throw new MeiliSearchError(`Meilisearch: The uid of the api key used for the token generation must exist, be of type string and comply to the uuid4 format.`);
    }
    if (!validateUuid4(uid)) {
        throw new MeiliSearchError(`Meilisearch: The uid of your key is not a valid uuid4. To find out the uid of your key use getKey().`);
    }
}
/**
 * Create the payload of the token.
 *
 * @param searchRules - Search rules that are applied to every search.
 * @param uid - The uid of the api key used as issuer of the token.
 * @param expiresAt - Date at which the token expires.
 * @returns The payload encoded in base64.
 */
function createPayload(payloadParams) {
    const { searchRules, uid, expiresAt } = payloadParams;
    const payload = {
        searchRules,
        apiKeyUid: uid,
        exp: expiresAt ? Math.floor(expiresAt.getTime() / 1000) : undefined,
    };
    return encode64(payload).replace(/=/g, '');
}
class Token {
    constructor(config) {
        this.config = config;
    }
    /**
     * Generate a tenant token
     *
     * @param apiKeyUid - The uid of the api key used as issuer of the token.
     * @param searchRules - Search rules that are applied to every search.
     * @param options - Token options to customize some aspect of the token.
     * @returns The token in JWT format.
     */
    generateTenantToken(apiKeyUid, searchRules, options) {
        const apiKey = (options === null || options === void 0 ? void 0 : options.apiKey) || this.config.apiKey || '';
        const uid = apiKeyUid || '';
        const expiresAt = options === null || options === void 0 ? void 0 : options.expiresAt;
        validateTokenParameters({ apiKey, uid, expiresAt, searchRules });
        const encodedHeader = createHeader();
        const encodedPayload = createPayload({ searchRules, uid, expiresAt });
        const signature = sign(apiKey, encodedHeader, encodedPayload);
        return `${encodedHeader}.${encodedPayload}.${signature}`;
    }
}

class MeiliSearch extends Client {
    constructor(config) {
        super(config);
        this.tokens = new Token(config);
    }
    /**
     * Generate a tenant token
     *
     * @param apiKeyUid - The uid of the api key used as issuer of the token.
     * @param searchRules - Search rules that are applied to every search.
     * @param options - Token options to customize some aspect of the token.
     * @returns The token in JWT format.
     */
    generateTenantToken(apiKeyUid, searchRules, options) {
        if (typeof window === 'undefined') {
            return this.tokens.generateTenantToken(apiKeyUid, searchRules, options);
        }
        return super.generateTenantToken(apiKeyUid, searchRules, options);
    }
}

export { ContentTypeEnum, EnqueuedTask, ErrorStatusCode, Index, MatchingStrategies, MeiliSearch, MeiliSearchApiError, MeiliSearchCommunicationError, MeiliSearchError, MeiliSearchTimeOutError, MeiliSearch as Meilisearch, Task, TaskClient, TaskStatus, TaskTypes, MeiliSearch as default, httpErrorHandler, httpResponseErrorHandler, versionErrorHintMessage };
