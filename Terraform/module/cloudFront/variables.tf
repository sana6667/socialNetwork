variable "conf_cloudFron" {
    type = object({
      provider_name = string
      sub_dns = string
      sub_dns_alb = string
      dns_name = string
      cl_front_name = string
      path_orig = string
      alb_monitoring_dns = string
    })

    default = {
        provider_name = "aws"
        sub_dns_alb = "api.soc-net.lat"
        sub_dns = "app.soc-net.lat"
        dns_name = "soc-net.lat"
        cl_front_name = "cl-front-test"
        path_orig = "/static"
        alb_monitoring_dns = "monitoring.soc-net.lat"
    }
}

variable "s3_cdn_import" {
    type = object({
      s3_cdn_name = string
      s3_cdn_id_value = string
      s3_arn_value = string
    })
}