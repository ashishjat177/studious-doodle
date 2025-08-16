import { pubSub } from "./pubsub";

export const TOASTR_TYPE = {
    SUCCESS: 'success',
    ERRROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
}


  export const toastr = {
        success: (text, duration) => pubSub.publish('toast', {type: TOASTR_TYPE.SUCCESS, text, duration}),
        error: (text, duration) => pubSub.publish('toast', {type: TOASTR_TYPE.ERRROR, text, duration}),
        info: (text, duration) =>  pubSub.publish('toast', {type: TOASTR_TYPE.INFO, text, duration}),
        warning: (text, duration) => pubSub.publish('toast', {type: TOASTR_TYPE.WARNING, text, duration}),
}