variable "conf_ecr" {
    type = object({
      ecr_name = string
    })
    default = {
        ecr_name = "diplom-ecr"
    }
}