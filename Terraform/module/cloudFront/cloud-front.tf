resource "aws_cloudfront_origin_access_control" "cl_front" {
    name = var.conf_cloudFron.cl_front_name
    origin_access_control_origin_type = "s3"
    signing_behavior = "always"
    signing_protocol = "sigv4"

}

resource "aws_cloudfront_distribution" "cdn" {
    enabled = true
    is_ipv6_enabled = true
    aliases = [var.conf_cloudFron.sub_dns]
    comment = "${var.conf_cloudFron.sub_dns} CDN"
    price_class = "PriceClass_100"
    default_root_object = "index.html"
    origin {
        domain_name = var.s3_cdn_import.s3_cdn_name
        origin_id = "origin-cdn-s3"
        origin_access_control_id = aws_cloudfront_origin_access_control.cl_front.id
    }
    default_cache_behavior {
        target_origin_id = "origin-cdn-s3"
        viewer_protocol_policy = "redirect-to-https"
        allowed_methods = ["GET", "HEAD"]
        cached_methods = ["GET", "HEAD"]
        compress = true
        forwarded_values {
            query_string = false
            cookies { forward = "none" }
        }
        min_ttl = 0
        default_ttl = 3600
        max_ttl = 86400
    }
    restrictions {
      geo_restriction {
        restriction_type = "none"
      }
    }
    viewer_certificate {
        acm_certificate_arn = aws_acm_certificate_validation.my_acm_valid.certificate_arn
        ssl_support_method = "sni-only"
        minimum_protocol_version = "TLSv1.2_2021"
    }
    
    #depends_on = [ aws_s3_bucket_public_access_block.block_s3_cdn ]
}

#data "aws_iam_policy_document" "cdn_bucket_policy" {
 #   statement {
  #      actions = ["s3:GetObject"]
   #     resources = ["${var.s3_cdn_import.s3_arn_value}/*"]
    #    sid = "AllowCloudFrontReadOnlyFromThisDistribution"
     #   principals {
      #      type = "Service"
       #     identifiers = ["cloudfront.amazonaws.com"]
       # }
        
      #  condition {
       #     test = "StringEquals" #было StringLike
        #    variable = "AWS:SourceArn"
         #   values = [ aws_cloudfront_distribution.cdn.arn ]
       # }

   # }
#}

#resource "aws_s3_bucket_policy" "s3_cdn_policy" {
 #   bucket = var.s3_cdn_import.s3_cdn_id_value
  #  policy = data.aws_iam_policy_document.cdn_bucket_policy.json
#}

# === ВСТАВЬ НИЖЕ ЭТО ===

# Политика бакета: доступ для OAC + (временно) для OAI

# ---- ЕДИНСТВЕННАЯ политика бакета: только под OAC ----
data "aws_iam_policy_document" "cdn_bucket_policy" {
  statement {
    sid       = "AllowCloudFrontOAC"
    actions   = ["s3:GetObject"]
    resources = ["${var.s3_cdn_import.s3_arn_value}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    # Привязка к КОНКРЕТНОЙ дистрибуции CloudFront
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cdn.arn]
    }
  }
}


resource "aws_s3_bucket_policy" "s3_cdn_policy" {
  bucket = var.s3_cdn_import.s3_cdn_id_value
  policy = data.aws_iam_policy_document.cdn_bucket_policy.json

  # Обеспечим порядок: сначала создаётся/обновляется Distribution, потом политика
  depends_on = [aws_cloudfront_distribution.cdn]
}