output "waf_arn" {
    description = "Name WAF"
    value = aws_wafv2_web_acl.socnet_acl.arn
}