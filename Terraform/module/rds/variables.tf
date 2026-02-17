variable "conf_network_import" {
    type = object({
        sub_priv_value = list(string)
        vpc_id_value = string
    })
}