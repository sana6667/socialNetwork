variable "conf_s3" {
    type =object({
      backet_name = string
    })
    default = {
        backet_name = "cdn-buck"
    }
}