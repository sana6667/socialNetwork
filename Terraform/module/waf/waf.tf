resource "aws_wafv2_web_acl" "socnet_acl" {
  name  = "socnet-web-acl"
  scope = "CLOUDFRONT"

  default_action {
    allow {}
  }

  rule {
    name     = "AWS-CRS"
    priority = 1

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    override_action {
      none {}
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name = "crs"
      sampled_requests_enabled = true
    }
  }

  rule {
    name     = "Bad-IPs"
    priority = 2

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesAmazonIpReputationList"
        vendor_name = "AWS"
      }
    }

    override_action {
      none {}
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name = "bad-ips"
      sampled_requests_enabled = true
    }
  }

  rule {
    name     = "rate-limit"
    priority = 3

    statement {
      rate_based_statement {
        limit              = 2000
        aggregate_key_type = "IP"
      }
    }

    action {
      block {}
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name = "rate-limit"
      sampled_requests_enabled = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "socnet-acl"
    sampled_requests_enabled   = true
  }
}