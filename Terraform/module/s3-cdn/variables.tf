variable "s3_cnd_conf_local" {
    type = object({
        bucket_name = string
    })
    default = {
        bucket_name = "s3-cdn-sana"
    }
}

